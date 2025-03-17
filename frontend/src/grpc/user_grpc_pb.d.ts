// package: user
// file: user.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as user_pb from "./user_pb";

interface IUserServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getUsers: IUserServiceService_IGetUsers;
}

interface IUserServiceService_IGetUsers extends grpc.MethodDefinition<user_pb.UserRequest, user_pb.UserResponse> {
    path: "/user.UserService/GetUsers";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<user_pb.UserRequest>;
    requestDeserialize: grpc.deserialize<user_pb.UserRequest>;
    responseSerialize: grpc.serialize<user_pb.UserResponse>;
    responseDeserialize: grpc.deserialize<user_pb.UserResponse>;
}

export const UserServiceService: IUserServiceService;

export interface IUserServiceServer {
    getUsers: grpc.handleUnaryCall<user_pb.UserRequest, user_pb.UserResponse>;
}

export interface IUserServiceClient {
    getUsers(request: user_pb.UserRequest, callback: (error: grpc.ServiceError | null, response: user_pb.UserResponse) => void): grpc.ClientUnaryCall;
    getUsers(request: user_pb.UserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.UserResponse) => void): grpc.ClientUnaryCall;
    getUsers(request: user_pb.UserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.UserResponse) => void): grpc.ClientUnaryCall;
}

export class UserServiceClient extends grpc.Client implements IUserServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getUsers(request: user_pb.UserRequest, callback: (error: grpc.ServiceError | null, response: user_pb.UserResponse) => void): grpc.ClientUnaryCall;
    public getUsers(request: user_pb.UserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.UserResponse) => void): grpc.ClientUnaryCall;
    public getUsers(request: user_pb.UserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.UserResponse) => void): grpc.ClientUnaryCall;
}
