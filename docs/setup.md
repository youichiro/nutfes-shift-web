## Setup

node.jsのインストール

```bash
$ curl -L git.io/nodebrew | perl - setup
$ echo 'export PATH=$HOME/.nodebrew/current/bin:$PATH' >> $HOME/.bashrc  # or .zshrc
$ source $HOME/.bashrc
$ node -v
v12.4.0
```

create-react-appをインストール

```bash
$ npm install -g create-react-app
```

クローン&ライブラリのインストール

```bash
$ git clone git@github.com:youichiro/nutfes-shift-web.git
$ cd nutfes-shift-web
$ npm install
```

設定ファイル

```bash
$ cp src/env_example.json src/env.json
# src/env.jsonにログインパスワードとAPIのURLを記入する
```

起動

```bash
$ npm start
```

サーバで公開するときは，公開用ファイルを生成し，buildディレクトリをnginxのrootに設定する

```bash
$ npm run build
```
