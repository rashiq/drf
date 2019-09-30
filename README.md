### What's the most creative way you can make circles appear on a website?


This repo searches for svg files on github that have a `<circle>` and displays those. This is very bare bones.

The free github api is rate limited so give it a minute if it's not showing anything.

I intentionally didn't use a more sophisticated build system. Thought about providing a dockerfile for this but that'd be way too overkill.


### Run server

Inside the server folder run:

```
virtualenv --python=python3 venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### Run website

Inside the website folder run:
```
yarn install
yarn run
```

<img width="963" alt="Screenshot 2019-09-30 at 07 59 23" src="https://user-images.githubusercontent.com/1624385/65854148-11677500-e35c-11e9-9ffc-f006df8c1bd8.png">
