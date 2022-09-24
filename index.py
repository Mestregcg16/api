from webbrowser import get
from flask import Flask, request, render_template
from pytube import YouTube
from os import listdir, path, rename
#   DEFS NECESSARIAS    #

app = Flask(__name__)
@app.route('/', methods=["GET", "POST"])
def baixar():
    if request.method == "POST":
        linki = request.form.get("linki")
        print(linki)
        try:
            yt = YouTube(linki)
            # Downloading
            video = yt.streams.filter(only_audio=True).first()
            v = video.download('static/data')
            # Converting
            
            bs = listdir('static//data')
            
            
            print(f'BASE: {bs}')
            base, ext = path.splitext(v)
            tirar = ['[',']','(',')','{','}','@','#','-','!','*','&','%','$','?','/','  ',' .','0','1','2','4','5','6','7','8','9']
            for i in tirar:
                base = base.replace(' .', '.')
                base = base.replace('/home/galo/Área de Trabalho/api/static/data', '')
                base = base.replace(i, '')
            
            print(base)
            feito = base + '.mp3'
            rename(v, f'static/data/{feito}')
        except:
            print("NAO DEU")
    
    arq = listdir('static//data')
    total = 0
    #LISTAR ARQUIVOS
    for i in arq:
        if i.endswith(".mp3"):
            total +=1
            
   
    return render_template('index.html', arq=arq, total=total)


if __name__ == "__main__":
    app.run(debug=False)
