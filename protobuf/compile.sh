#!/usr/bin/zsh
protoc --plugin=../node_modules/.bin/protoc-gen-ts_proto --proto_path=./ --ts_proto_out=./generated/ --ts_proto_opt=esModuleInterop=true --ts_proto_opt=importSuffix=.ts *.proto