from flask import Flask, request, jsonify

import urllib.parse
import subprocess
import os
import time

app = Flask(__name__)


@app.route('/')
def hello_world():
    return "You have reached the archiver server."


@app.route('/archive', methods = ['GET'])
def archive_site():

    # We tried to this properly but were short on time at the end
    # SUPER hacky plz don't judge me >_<

    url = request.args.get('url')
    wget_args = [
        "wget",
        "--convert-links",
        "--adjust-extension",
        "--page-requisites",
        "--no-parent",
        "--restrict-file-names=windows",
        "-P",
        "temp",
        url
    ]

    subprocess.run(wget_args)
    website_name = os.listdir('temp')[0]
    decoded = urllib.parse.unquote(url)
    path = urllib.parse.urlparse(decoded).path

    res = subprocess.run(['ipfs', 'add', '-r', 'temp', '-Q'], capture_output=True, text=True)
    hash = res.stdout.strip()
    subprocess.run(['ipfs', 'pin', 'add', '-r', hash])
    subprocess.run(['rm', '-rf', 'temp'])

    data = {
        'location': '/'.join([hash, website_name, path.strip('/')]),
        'timestamp': int(time.time())
    }

    return jsonify(data)


if __name__ == '__main__':
    app.run()
