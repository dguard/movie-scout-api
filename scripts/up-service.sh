#/bin/bash
CMD=$(cat << EOF
const dotenv = require('dotenv');
dotenv.config();

const fs = require('fs');
const content = fs.readFileSync('./filesystem/etc/systemd/system/movie-daemon.service');
const res = content.toString().replace('{{ROOT_DIR}}', process.env.ROOT_DIR);
console.log(res);
EOF
)
node -e "${CMD}" | sudo tee /etc/systemd/system/movie-daemon.service
sudo service movie-daemon start
