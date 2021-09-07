import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type QRCodeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type BlogMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class QRCode {
  readonly id: string;
  readonly url: string;
  readonly title: string;
  readonly canvas: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<QRCode, QRCodeMetaData>);
  static copyOf(source: QRCode, mutator: (draft: MutableModel<QRCode, QRCodeMetaData>) => MutableModel<QRCode, QRCodeMetaData> | void): QRCode;
}

export declare class Blog {
  readonly id: string;
  readonly name: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Blog, BlogMetaData>);
  static copyOf(source: Blog, mutator: (draft: MutableModel<Blog, BlogMetaData>) => MutableModel<Blog, BlogMetaData> | void): Blog;
}