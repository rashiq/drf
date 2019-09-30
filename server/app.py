from flask import Flask, jsonify
import github_svg

app = Flask(__name__)


@app.route('/api/v1/gh_svg', methods=['GET'])
def get_github_svg():
  svg_info = github_svg.get_svg()
  if not svg_info:
    return jsonify({
      'error': 'Seems like you\'ve hit the rate limit of the github API.'
    }), 429

  response = jsonify(svg_info._asdict())
  response.headers.add('Access-Control-Allow-Origin', '*')
  return response


if __name__ == '__main__':
  app.run()
