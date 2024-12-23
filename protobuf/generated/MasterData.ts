// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.6.0
//   protoc               v5.29.2
// source: MasterData.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { CommonRequest, CommonResponse } from "./Common.ts";

export const protobufPackage = "";

export interface MasterDataRequest {
  head: CommonRequest | undefined;
}

export interface MasterDataResponse {
  head: CommonResponse | undefined;
  data: MasterData[];
}

export interface MasterData {
  name: string;
  hash: string;
  url: string;
  size: number;
}

function createBaseMasterDataRequest(): MasterDataRequest {
  return { head: undefined };
}

export const MasterDataRequest: MessageFns<MasterDataRequest> = {
  encode(message: MasterDataRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.head !== undefined) {
      CommonRequest.encode(message.head, writer.uint32(10).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MasterDataRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMasterDataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.head = CommonRequest.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MasterDataRequest {
    return { head: isSet(object.head) ? CommonRequest.fromJSON(object.head) : undefined };
  },

  toJSON(message: MasterDataRequest): unknown {
    const obj: any = {};
    if (message.head !== undefined) {
      obj.head = CommonRequest.toJSON(message.head);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MasterDataRequest>, I>>(base?: I): MasterDataRequest {
    return MasterDataRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MasterDataRequest>, I>>(object: I): MasterDataRequest {
    const message = createBaseMasterDataRequest();
    message.head = (object.head !== undefined && object.head !== null)
      ? CommonRequest.fromPartial(object.head)
      : undefined;
    return message;
  },
};

function createBaseMasterDataResponse(): MasterDataResponse {
  return { head: undefined, data: [] };
}

export const MasterDataResponse: MessageFns<MasterDataResponse> = {
  encode(message: MasterDataResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.head !== undefined) {
      CommonResponse.encode(message.head, writer.uint32(10).fork()).join();
    }
    for (const v of message.data) {
      MasterData.encode(v!, writer.uint32(18).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MasterDataResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMasterDataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.head = CommonResponse.decode(reader, reader.uint32());
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.data.push(MasterData.decode(reader, reader.uint32()));
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MasterDataResponse {
    return {
      head: isSet(object.head) ? CommonResponse.fromJSON(object.head) : undefined,
      data: globalThis.Array.isArray(object?.data) ? object.data.map((e: any) => MasterData.fromJSON(e)) : [],
    };
  },

  toJSON(message: MasterDataResponse): unknown {
    const obj: any = {};
    if (message.head !== undefined) {
      obj.head = CommonResponse.toJSON(message.head);
    }
    if (message.data?.length) {
      obj.data = message.data.map((e) => MasterData.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MasterDataResponse>, I>>(base?: I): MasterDataResponse {
    return MasterDataResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MasterDataResponse>, I>>(object: I): MasterDataResponse {
    const message = createBaseMasterDataResponse();
    message.head = (object.head !== undefined && object.head !== null)
      ? CommonResponse.fromPartial(object.head)
      : undefined;
    message.data = object.data?.map((e) => MasterData.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMasterData(): MasterData {
  return { name: "", hash: "", url: "", size: 0 };
}

export const MasterData: MessageFns<MasterData> = {
  encode(message: MasterData, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.hash !== "") {
      writer.uint32(18).string(message.hash);
    }
    if (message.url !== "") {
      writer.uint32(26).string(message.url);
    }
    if (message.size !== 0) {
      writer.uint32(32).int64(message.size);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MasterData {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMasterData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.hash = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.url = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }

          message.size = longToNumber(reader.int64());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MasterData {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      hash: isSet(object.hash) ? globalThis.String(object.hash) : "",
      url: isSet(object.url) ? globalThis.String(object.url) : "",
      size: isSet(object.size) ? globalThis.Number(object.size) : 0,
    };
  },

  toJSON(message: MasterData): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.hash !== "") {
      obj.hash = message.hash;
    }
    if (message.url !== "") {
      obj.url = message.url;
    }
    if (message.size !== 0) {
      obj.size = Math.round(message.size);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MasterData>, I>>(base?: I): MasterData {
    return MasterData.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MasterData>, I>>(object: I): MasterData {
    const message = createBaseMasterData();
    message.name = object.name ?? "";
    message.hash = object.hash ?? "";
    message.url = object.url ?? "";
    message.size = object.size ?? 0;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(int64: { toString(): string }): number {
  const num = globalThis.Number(int64.toString());
  if (num > globalThis.Number.MAX_SAFE_INTEGER) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  if (num < globalThis.Number.MIN_SAFE_INTEGER) {
    throw new globalThis.Error("Value is smaller than Number.MIN_SAFE_INTEGER");
  }
  return num;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
  fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}
