import base64
import random

import requests
from bs4 import BeautifulSoup, element
from jinja2 import Template

from models import SvgInfo


def search_for_svg():
  params = (
    ('q', '<circle language:SVG in:file org:microsoft org:google org:facebook'),
    ('page', random.randint(0, 20))
  )

  response = requests.get('https://api.github.com/search/code', params=params)
  if response.status_code != 200: return
  items = response.json().get('items')
  return items[random.randint(0, len(items) - 1)]


def download_svg(item):
  file_url = item.get('url')
  r = requests.get(file_url)
  if r.status_code != 200: return

  file_content = r.json().get('content')
  return base64.b64decode(file_content)


def parse_circle(svg):
  soup = BeautifulSoup(svg, "lxml")
  all_circle = soup.find_all('circle')
  if not all_circle: return
  return all_circle[random.randint(0, len(all_circle) - 1)]


def calculate_viewbox(node: element.Tag) -> (int, int):
  attributes = node.attrs

  if not all([
    'cx' in attributes,
    'cy' in attributes,
  ]): return

  int_length = lambda x: len(str(int((float(x)))))

  return (
    10 ** int_length(attributes['cx']) * 2,
    10 ** int_length(attributes['cy']) * 2
  )


def render_svg(width, height, circle):
  return Template(
    """
    <svg viewBox="0 0 {{ width }} {{ height }}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      {{ circle }}
    </svg>
    """).render(width=width, height=height, circle=circle)


def get_svg() -> SvgInfo:
  item = search_for_svg()
  if not item: return
  downloaded_svg = download_svg(item)
  if not downloaded_svg: return
  svg_circle = parse_circle(downloaded_svg)
  width, height = calculate_viewbox(svg_circle)
  svg = render_svg(width, height, str(svg_circle))
  return SvgInfo(
    svg=svg,
    repo_url=item.get('repository', {}).get('html_url'),
    repo_name=item.get('repository', {}).get('full_name'),
    file_url=item.get('html_url'),
    file_name=item.get('name'),
  )


if __name__ == '__main__':
  print(get_svg())
