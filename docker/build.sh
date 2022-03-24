container=node
image=bookmark-viewer

cd $(dirname $0)
docker build -t ${image} .
docker kill ${container} 2>/dev/null
docker rm ${container} 2>/dev/null

mntdir=$(cd ../; pwd)
echo "[${mntdir}]をマウントします"
echo "ホスト側でbuildを行っていないとrunが成功しません"

docker run -it -d \
    --mount type=bind,source="${mntdir}",target=/home/node/my-work \
    -p 80:3000 \
    --name ${container} \
    --restart=always \
    ${image}

cd -
