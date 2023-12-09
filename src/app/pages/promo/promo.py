from flask import Flask, render_template, redirect

ip_servidor = "192.168.1.2"
url_servidor = "http://" + ip_servidor + ":5000"

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/movil')
def movil():
    return render_template('movil.html')

@app.route('/pc')
def pc():
    return render_template('pc.html', url_servidor=url_servidor)

@app.route('/apk')
def apk():
    return redirect('static/apk/app-release.apk')

if __name__ == '__main__':
    app.run(debug=True, host=ip_servidor, port=5000)