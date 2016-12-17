FROM mhart/alpine-node:6

# Install required dependencies (Alpine Linux packages)
RUN apk update && \
  apk add --no-cache \
    sudo \
    g++ \
    gcc \
    git \
    libev-dev \
    libevent-dev \
    libuv-dev \
    make \
    openssl-dev \
    perl \
    python

# Add user and make it sudoer
ARG uid=1000
ARG user
RUN adduser -DS -u $uid $user
RUN echo $user' ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

# Switch to directory for external dependencies (installed from source)
WORKDIR /external

# Install (global) NPM packages/dependencies
RUN npm install -g \
  node-gyp

# Make project directory with permissions
RUN mkdir /project

# Switch to project directory
WORKDIR /project

# Copy required stuff
COPY . .

# Install (local) NPM packages and build
RUN npm install && npm run postinstall
