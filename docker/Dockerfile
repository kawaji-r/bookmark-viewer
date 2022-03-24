FROM node:16.13.2
USER node
WORKDIR /home/node
RUN echo "set -o vi" >> .bashrc
RUN echo "alias ll='ls -la --color=auto'" >> .bashrc
WORKDIR my-work
CMD ["npm","run","start"]
