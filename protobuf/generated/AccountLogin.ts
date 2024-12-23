// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.6.0
//   protoc               v5.29.2
// source: AccountLogin.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { CommonRequest, CommonResponse } from "./Common.ts";
import { PlayerSummary } from "./PlayerSummary.ts";

export const protobufPackage = "";

export enum Status {
  STATUS_NORMAL = 0,
  STATUS_ADMIN = 1,
  STATUS_STAFF = 2,
  STATUS_WARN = 3,
  STATUS_BLOCK = 4,
  UNRECOGNIZED = -1,
}

export function statusFromJSON(object: any): Status {
  switch (object) {
    case 0:
    case "STATUS_NORMAL":
      return Status.STATUS_NORMAL;
    case 1:
    case "STATUS_ADMIN":
      return Status.STATUS_ADMIN;
    case 2:
    case "STATUS_STAFF":
      return Status.STATUS_STAFF;
    case 3:
    case "STATUS_WARN":
      return Status.STATUS_WARN;
    case 4:
    case "STATUS_BLOCK":
      return Status.STATUS_BLOCK;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Status.UNRECOGNIZED;
  }
}

export function statusToJSON(object: Status): string {
  switch (object) {
    case Status.STATUS_NORMAL:
      return "STATUS_NORMAL";
    case Status.STATUS_ADMIN:
      return "STATUS_ADMIN";
    case Status.STATUS_STAFF:
      return "STATUS_STAFF";
    case Status.STATUS_WARN:
      return "STATUS_WARN";
    case Status.STATUS_BLOCK:
      return "STATUS_BLOCK";
    case Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum ExpireStatus {
  EXPIRE_STATUS_NONE = 0,
  EXPIRE_STATUS_NEW_DEVICE = 1,
  EXPIRE_STATUS_TOKEN_MISSMATCH = 2,
  UNRECOGNIZED = -1,
}

export function expireStatusFromJSON(object: any): ExpireStatus {
  switch (object) {
    case 0:
    case "EXPIRE_STATUS_NONE":
      return ExpireStatus.EXPIRE_STATUS_NONE;
    case 1:
    case "EXPIRE_STATUS_NEW_DEVICE":
      return ExpireStatus.EXPIRE_STATUS_NEW_DEVICE;
    case 2:
    case "EXPIRE_STATUS_TOKEN_MISSMATCH":
      return ExpireStatus.EXPIRE_STATUS_TOKEN_MISSMATCH;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ExpireStatus.UNRECOGNIZED;
  }
}

export function expireStatusToJSON(object: ExpireStatus): string {
  switch (object) {
    case ExpireStatus.EXPIRE_STATUS_NONE:
      return "EXPIRE_STATUS_NONE";
    case ExpireStatus.EXPIRE_STATUS_NEW_DEVICE:
      return "EXPIRE_STATUS_NEW_DEVICE";
    case ExpireStatus.EXPIRE_STATUS_TOKEN_MISSMATCH:
      return "EXPIRE_STATUS_TOKEN_MISSMATCH";
    case ExpireStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface AccountLoginRequest {
  head: CommonRequest | undefined;
  deviceId: string;
  publicId: string;
}

export interface AccountLoginResponse {
  head: CommonResponse | undefined;
  publicId: string;
  master: number;
  resource: number;
  isSavedataExpired: number;
  status: Status;
  redirectHost: string;
  playerSummary: PlayerSummary | undefined;
  expireStatus: ExpireStatus;
}

function createBaseAccountLoginRequest(): AccountLoginRequest {
  return { head: undefined, deviceId: "", publicId: "" };
}

export const AccountLoginRequest: MessageFns<AccountLoginRequest> = {
  encode(message: AccountLoginRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.head !== undefined) {
      CommonRequest.encode(message.head, writer.uint32(10).fork()).join();
    }
    if (message.deviceId !== "") {
      writer.uint32(18).string(message.deviceId);
    }
    if (message.publicId !== "") {
      writer.uint32(26).string(message.publicId);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): AccountLoginRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountLoginRequest();
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

          message.deviceId = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.publicId = reader.string();
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

  fromJSON(object: any): AccountLoginRequest {
    return {
      head: isSet(object.head) ? CommonRequest.fromJSON(object.head) : undefined,
      deviceId: isSet(object.deviceId) ? globalThis.String(object.deviceId) : "",
      publicId: isSet(object.publicId) ? globalThis.String(object.publicId) : "",
    };
  },

  toJSON(message: AccountLoginRequest): unknown {
    const obj: any = {};
    if (message.head !== undefined) {
      obj.head = CommonRequest.toJSON(message.head);
    }
    if (message.deviceId !== "") {
      obj.deviceId = message.deviceId;
    }
    if (message.publicId !== "") {
      obj.publicId = message.publicId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountLoginRequest>, I>>(base?: I): AccountLoginRequest {
    return AccountLoginRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccountLoginRequest>, I>>(object: I): AccountLoginRequest {
    const message = createBaseAccountLoginRequest();
    message.head = (object.head !== undefined && object.head !== null)
      ? CommonRequest.fromPartial(object.head)
      : undefined;
    message.deviceId = object.deviceId ?? "";
    message.publicId = object.publicId ?? "";
    return message;
  },
};

function createBaseAccountLoginResponse(): AccountLoginResponse {
  return {
    head: undefined,
    publicId: "",
    master: 0,
    resource: 0,
    isSavedataExpired: 0,
    status: 0,
    redirectHost: "",
    playerSummary: undefined,
    expireStatus: 0,
  };
}

export const AccountLoginResponse: MessageFns<AccountLoginResponse> = {
  encode(message: AccountLoginResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.head !== undefined) {
      CommonResponse.encode(message.head, writer.uint32(10).fork()).join();
    }
    if (message.publicId !== "") {
      writer.uint32(18).string(message.publicId);
    }
    if (message.master !== 0) {
      writer.uint32(24).int32(message.master);
    }
    if (message.resource !== 0) {
      writer.uint32(32).int32(message.resource);
    }
    if (message.isSavedataExpired !== 0) {
      writer.uint32(40).int32(message.isSavedataExpired);
    }
    if (message.status !== 0) {
      writer.uint32(48).int32(message.status);
    }
    if (message.redirectHost !== "") {
      writer.uint32(58).string(message.redirectHost);
    }
    if (message.playerSummary !== undefined) {
      PlayerSummary.encode(message.playerSummary, writer.uint32(66).fork()).join();
    }
    if (message.expireStatus !== 0) {
      writer.uint32(72).int32(message.expireStatus);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): AccountLoginResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountLoginResponse();
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

          message.publicId = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }

          message.master = reader.int32();
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }

          message.resource = reader.int32();
          continue;
        }
        case 5: {
          if (tag !== 40) {
            break;
          }

          message.isSavedataExpired = reader.int32();
          continue;
        }
        case 6: {
          if (tag !== 48) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        }
        case 7: {
          if (tag !== 58) {
            break;
          }

          message.redirectHost = reader.string();
          continue;
        }
        case 8: {
          if (tag !== 66) {
            break;
          }

          message.playerSummary = PlayerSummary.decode(reader, reader.uint32());
          continue;
        }
        case 9: {
          if (tag !== 72) {
            break;
          }

          message.expireStatus = reader.int32() as any;
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

  fromJSON(object: any): AccountLoginResponse {
    return {
      head: isSet(object.head) ? CommonResponse.fromJSON(object.head) : undefined,
      publicId: isSet(object.publicId) ? globalThis.String(object.publicId) : "",
      master: isSet(object.master) ? globalThis.Number(object.master) : 0,
      resource: isSet(object.resource) ? globalThis.Number(object.resource) : 0,
      isSavedataExpired: isSet(object.isSavedataExpired) ? globalThis.Number(object.isSavedataExpired) : 0,
      status: isSet(object.status) ? statusFromJSON(object.status) : 0,
      redirectHost: isSet(object.redirectHost) ? globalThis.String(object.redirectHost) : "",
      playerSummary: isSet(object.playerSummary) ? PlayerSummary.fromJSON(object.playerSummary) : undefined,
      expireStatus: isSet(object.expireStatus) ? expireStatusFromJSON(object.expireStatus) : 0,
    };
  },

  toJSON(message: AccountLoginResponse): unknown {
    const obj: any = {};
    if (message.head !== undefined) {
      obj.head = CommonResponse.toJSON(message.head);
    }
    if (message.publicId !== "") {
      obj.publicId = message.publicId;
    }
    if (message.master !== 0) {
      obj.master = Math.round(message.master);
    }
    if (message.resource !== 0) {
      obj.resource = Math.round(message.resource);
    }
    if (message.isSavedataExpired !== 0) {
      obj.isSavedataExpired = Math.round(message.isSavedataExpired);
    }
    if (message.status !== 0) {
      obj.status = statusToJSON(message.status);
    }
    if (message.redirectHost !== "") {
      obj.redirectHost = message.redirectHost;
    }
    if (message.playerSummary !== undefined) {
      obj.playerSummary = PlayerSummary.toJSON(message.playerSummary);
    }
    if (message.expireStatus !== 0) {
      obj.expireStatus = expireStatusToJSON(message.expireStatus);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountLoginResponse>, I>>(base?: I): AccountLoginResponse {
    return AccountLoginResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccountLoginResponse>, I>>(object: I): AccountLoginResponse {
    const message = createBaseAccountLoginResponse();
    message.head = (object.head !== undefined && object.head !== null)
      ? CommonResponse.fromPartial(object.head)
      : undefined;
    message.publicId = object.publicId ?? "";
    message.master = object.master ?? 0;
    message.resource = object.resource ?? 0;
    message.isSavedataExpired = object.isSavedataExpired ?? 0;
    message.status = object.status ?? 0;
    message.redirectHost = object.redirectHost ?? "";
    message.playerSummary = (object.playerSummary !== undefined && object.playerSummary !== null)
      ? PlayerSummary.fromPartial(object.playerSummary)
      : undefined;
    message.expireStatus = object.expireStatus ?? 0;
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
