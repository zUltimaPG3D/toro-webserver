// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.6.0
//   protoc               v5.29.2
// source: UserInfo.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { CommonRequest, CommonResponse } from "./Common.ts";

export const protobufPackage = "";

export interface UserInfoRequest {
  head: CommonRequest | undefined;
  keyList: string[];
}

export interface UserInfoResponse {
  head: CommonResponse | undefined;
  propertyList: UserProperty[];
}

export interface UserUpdateRequest {
  head: CommonRequest | undefined;
  propertyList: UserProperty[];
}

export interface UserProperty {
  key: string;
  value: string;
}

function createBaseUserInfoRequest(): UserInfoRequest {
  return { head: undefined, keyList: [] };
}

export const UserInfoRequest: MessageFns<UserInfoRequest> = {
  encode(message: UserInfoRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.head !== undefined) {
      CommonRequest.encode(message.head, writer.uint32(10).fork()).join();
    }
    for (const v of message.keyList) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): UserInfoRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserInfoRequest();
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
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.keyList.push(reader.string());
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

  fromJSON(object: any): UserInfoRequest {
    return {
      head: isSet(object.head) ? CommonRequest.fromJSON(object.head) : undefined,
      keyList: globalThis.Array.isArray(object?.keyList) ? object.keyList.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: UserInfoRequest): unknown {
    const obj: any = {};
    if (message.head !== undefined) {
      obj.head = CommonRequest.toJSON(message.head);
    }
    if (message.keyList?.length) {
      obj.keyList = message.keyList;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserInfoRequest>, I>>(base?: I): UserInfoRequest {
    return UserInfoRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserInfoRequest>, I>>(object: I): UserInfoRequest {
    const message = createBaseUserInfoRequest();
    message.head = (object.head !== undefined && object.head !== null)
      ? CommonRequest.fromPartial(object.head)
      : undefined;
    message.keyList = object.keyList?.map((e) => e) || [];
    return message;
  },
};

function createBaseUserInfoResponse(): UserInfoResponse {
  return { head: undefined, propertyList: [] };
}

export const UserInfoResponse: MessageFns<UserInfoResponse> = {
  encode(message: UserInfoResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.head !== undefined) {
      CommonResponse.encode(message.head, writer.uint32(10).fork()).join();
    }
    for (const v of message.propertyList) {
      UserProperty.encode(v!, writer.uint32(18).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): UserInfoResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserInfoResponse();
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

          message.propertyList.push(UserProperty.decode(reader, reader.uint32()));
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

  fromJSON(object: any): UserInfoResponse {
    return {
      head: isSet(object.head) ? CommonResponse.fromJSON(object.head) : undefined,
      propertyList: globalThis.Array.isArray(object?.propertyList)
        ? object.propertyList.map((e: any) => UserProperty.fromJSON(e))
        : [],
    };
  },

  toJSON(message: UserInfoResponse): unknown {
    const obj: any = {};
    if (message.head !== undefined) {
      obj.head = CommonResponse.toJSON(message.head);
    }
    if (message.propertyList?.length) {
      obj.propertyList = message.propertyList.map((e) => UserProperty.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserInfoResponse>, I>>(base?: I): UserInfoResponse {
    return UserInfoResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserInfoResponse>, I>>(object: I): UserInfoResponse {
    const message = createBaseUserInfoResponse();
    message.head = (object.head !== undefined && object.head !== null)
      ? CommonResponse.fromPartial(object.head)
      : undefined;
    message.propertyList = object.propertyList?.map((e) => UserProperty.fromPartial(e)) || [];
    return message;
  },
};

function createBaseUserUpdateRequest(): UserUpdateRequest {
  return { head: undefined, propertyList: [] };
}

export const UserUpdateRequest: MessageFns<UserUpdateRequest> = {
  encode(message: UserUpdateRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.head !== undefined) {
      CommonRequest.encode(message.head, writer.uint32(10).fork()).join();
    }
    for (const v of message.propertyList) {
      UserProperty.encode(v!, writer.uint32(18).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): UserUpdateRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserUpdateRequest();
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
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.propertyList.push(UserProperty.decode(reader, reader.uint32()));
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

  fromJSON(object: any): UserUpdateRequest {
    return {
      head: isSet(object.head) ? CommonRequest.fromJSON(object.head) : undefined,
      propertyList: globalThis.Array.isArray(object?.propertyList)
        ? object.propertyList.map((e: any) => UserProperty.fromJSON(e))
        : [],
    };
  },

  toJSON(message: UserUpdateRequest): unknown {
    const obj: any = {};
    if (message.head !== undefined) {
      obj.head = CommonRequest.toJSON(message.head);
    }
    if (message.propertyList?.length) {
      obj.propertyList = message.propertyList.map((e) => UserProperty.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserUpdateRequest>, I>>(base?: I): UserUpdateRequest {
    return UserUpdateRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserUpdateRequest>, I>>(object: I): UserUpdateRequest {
    const message = createBaseUserUpdateRequest();
    message.head = (object.head !== undefined && object.head !== null)
      ? CommonRequest.fromPartial(object.head)
      : undefined;
    message.propertyList = object.propertyList?.map((e) => UserProperty.fromPartial(e)) || [];
    return message;
  },
};

function createBaseUserProperty(): UserProperty {
  return { key: "", value: "" };
}

export const UserProperty: MessageFns<UserProperty> = {
  encode(message: UserProperty, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): UserProperty {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserProperty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
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

  fromJSON(object: any): UserProperty {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: UserProperty): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserProperty>, I>>(base?: I): UserProperty {
    return UserProperty.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserProperty>, I>>(object: I): UserProperty {
    const message = createBaseUserProperty();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
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
