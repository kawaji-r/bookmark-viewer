## nodejsインストール
```
sudo apt install -y nodejs npm
sudo npm install n -g
sudo n stable
sudo apt purge -y nodejs npm
node -v
```

## Introduce
* 表示するブックマークを記述する設定ファイルを作成する
```
mv server/link_file_path.conf_sample server/link_file_path.conf
```
* モジュールインストール
```
npm install
```
* ビルド
```
npm run build
```
* Dockerコンテナ作成
```
bash docker/build.sh
```
* http://localhost にアクセスして確認