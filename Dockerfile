FROM mhart/alpine-node:5.6.0

# Install required dependencies (Alpine Linux packages)
RUN apk update && \
  apk add --no-cache \
    cmake \
    g++ \
    gcc \
    gd-dev \
    git \
    libev-dev \
    libevent-dev \
    libuv-dev \
    make \
    openssl-dev \
    perl \
    python

# Switch to directory for external dependencies (installed from source)
WORKDIR /external

# Install couchbase stuff from sources
RUN wget http://packages.couchbase.com/clients/c/libcouchbase-2.5.5.tar.gz && \
  tar xzf libcouchbase-2.5.5.tar.gz && \
  cd libcouchbase-2.5.5 && \
  perl ./configure.pl && \
  make install && \
  cd .. \
  rm -rf libcouchbase-2.5.5

# Install (global) NPM packages/dependencies
RUN npm install -g \
  coffee-script \
  node-gyp \
  pm2

# Switch to directory with sources
WORKDIR /src

# Copy required stuff
ADD . .

# Install (local) NPM packages/dependencies
RUN npm install

# Build (using webpack) assets
RUN npm run build

# Expose public ports
EXPOSE 8080

# Specify default CMD
CMD ["npm", "run", "start"]

