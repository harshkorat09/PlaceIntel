
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Company
 * 
 */
export type Company = $Result.DefaultSelection<Prisma.$CompanyPayload>
/**
 * Model Placement
 * 
 */
export type Placement = $Result.DefaultSelection<Prisma.$PlacementPayload>
/**
 * Model Branch
 * 
 */
export type Branch = $Result.DefaultSelection<Prisma.$BranchPayload>
/**
 * Model Skill
 * 
 */
export type Skill = $Result.DefaultSelection<Prisma.$SkillPayload>
/**
 * Model StudentSkill
 * 
 */
export type StudentSkill = $Result.DefaultSelection<Prisma.$StudentSkillPayload>
/**
 * Model PlacementSkill
 * 
 */
export type PlacementSkill = $Result.DefaultSelection<Prisma.$PlacementSkillPayload>
/**
 * Model PlacementBranch
 * 
 */
export type PlacementBranch = $Result.DefaultSelection<Prisma.$PlacementBranchPayload>
/**
 * Model Attachment
 * 
 */
export type Attachment = $Result.DefaultSelection<Prisma.$AttachmentPayload>
/**
 * Model PlacementChunk
 * 
 */
export type PlacementChunk = $Result.DefaultSelection<Prisma.$PlacementChunkPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  STUDENT: 'STUDENT',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


export const Institute: {
  DEPSTAR: 'DEPSTAR',
  CSPIT: 'CSPIT'
};

export type Institute = (typeof Institute)[keyof typeof Institute]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type Institute = $Enums.Institute

export const Institute: typeof $Enums.Institute

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.company`: Exposes CRUD operations for the **Company** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Companies
    * const companies = await prisma.company.findMany()
    * ```
    */
  get company(): Prisma.CompanyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.placement`: Exposes CRUD operations for the **Placement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Placements
    * const placements = await prisma.placement.findMany()
    * ```
    */
  get placement(): Prisma.PlacementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.branch`: Exposes CRUD operations for the **Branch** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Branches
    * const branches = await prisma.branch.findMany()
    * ```
    */
  get branch(): Prisma.BranchDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.skill`: Exposes CRUD operations for the **Skill** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Skills
    * const skills = await prisma.skill.findMany()
    * ```
    */
  get skill(): Prisma.SkillDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.studentSkill`: Exposes CRUD operations for the **StudentSkill** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StudentSkills
    * const studentSkills = await prisma.studentSkill.findMany()
    * ```
    */
  get studentSkill(): Prisma.StudentSkillDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.placementSkill`: Exposes CRUD operations for the **PlacementSkill** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PlacementSkills
    * const placementSkills = await prisma.placementSkill.findMany()
    * ```
    */
  get placementSkill(): Prisma.PlacementSkillDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.placementBranch`: Exposes CRUD operations for the **PlacementBranch** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PlacementBranches
    * const placementBranches = await prisma.placementBranch.findMany()
    * ```
    */
  get placementBranch(): Prisma.PlacementBranchDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.attachment`: Exposes CRUD operations for the **Attachment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Attachments
    * const attachments = await prisma.attachment.findMany()
    * ```
    */
  get attachment(): Prisma.AttachmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.placementChunk`: Exposes CRUD operations for the **PlacementChunk** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PlacementChunks
    * const placementChunks = await prisma.placementChunk.findMany()
    * ```
    */
  get placementChunk(): Prisma.PlacementChunkDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.9.1
   * Query Engine version: e922089b7d7502aff4249d5da3420f6fa55fc6ad
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Company: 'Company',
    Placement: 'Placement',
    Branch: 'Branch',
    Skill: 'Skill',
    StudentSkill: 'StudentSkill',
    PlacementSkill: 'PlacementSkill',
    PlacementBranch: 'PlacementBranch',
    Attachment: 'Attachment',
    PlacementChunk: 'PlacementChunk'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "company" | "placement" | "branch" | "skill" | "studentSkill" | "placementSkill" | "placementBranch" | "attachment" | "placementChunk"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Company: {
        payload: Prisma.$CompanyPayload<ExtArgs>
        fields: Prisma.CompanyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findFirst: {
            args: Prisma.CompanyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findMany: {
            args: Prisma.CompanyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          create: {
            args: Prisma.CompanyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          createMany: {
            args: Prisma.CompanyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompanyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          delete: {
            args: Prisma.CompanyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          update: {
            args: Prisma.CompanyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          deleteMany: {
            args: Prisma.CompanyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CompanyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          upsert: {
            args: Prisma.CompanyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          aggregate: {
            args: Prisma.CompanyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompany>
          }
          groupBy: {
            args: Prisma.CompanyGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanyCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyCountAggregateOutputType> | number
          }
        }
      }
      Placement: {
        payload: Prisma.$PlacementPayload<ExtArgs>
        fields: Prisma.PlacementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlacementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlacementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementPayload>
          }
          findFirst: {
            args: Prisma.PlacementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlacementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementPayload>
          }
          findMany: {
            args: Prisma.PlacementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementPayload>[]
          }
          create: {
            args: Prisma.PlacementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementPayload>
          }
          createMany: {
            args: Prisma.PlacementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlacementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementPayload>[]
          }
          delete: {
            args: Prisma.PlacementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementPayload>
          }
          update: {
            args: Prisma.PlacementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementPayload>
          }
          deleteMany: {
            args: Prisma.PlacementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlacementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlacementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementPayload>[]
          }
          upsert: {
            args: Prisma.PlacementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementPayload>
          }
          aggregate: {
            args: Prisma.PlacementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlacement>
          }
          groupBy: {
            args: Prisma.PlacementGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlacementGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlacementCountArgs<ExtArgs>
            result: $Utils.Optional<PlacementCountAggregateOutputType> | number
          }
        }
      }
      Branch: {
        payload: Prisma.$BranchPayload<ExtArgs>
        fields: Prisma.BranchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BranchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BranchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          findFirst: {
            args: Prisma.BranchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BranchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          findMany: {
            args: Prisma.BranchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>[]
          }
          create: {
            args: Prisma.BranchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          createMany: {
            args: Prisma.BranchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BranchCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>[]
          }
          delete: {
            args: Prisma.BranchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          update: {
            args: Prisma.BranchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          deleteMany: {
            args: Prisma.BranchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BranchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BranchUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>[]
          }
          upsert: {
            args: Prisma.BranchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          aggregate: {
            args: Prisma.BranchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBranch>
          }
          groupBy: {
            args: Prisma.BranchGroupByArgs<ExtArgs>
            result: $Utils.Optional<BranchGroupByOutputType>[]
          }
          count: {
            args: Prisma.BranchCountArgs<ExtArgs>
            result: $Utils.Optional<BranchCountAggregateOutputType> | number
          }
        }
      }
      Skill: {
        payload: Prisma.$SkillPayload<ExtArgs>
        fields: Prisma.SkillFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SkillFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SkillFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>
          }
          findFirst: {
            args: Prisma.SkillFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SkillFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>
          }
          findMany: {
            args: Prisma.SkillFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>[]
          }
          create: {
            args: Prisma.SkillCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>
          }
          createMany: {
            args: Prisma.SkillCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SkillCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>[]
          }
          delete: {
            args: Prisma.SkillDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>
          }
          update: {
            args: Prisma.SkillUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>
          }
          deleteMany: {
            args: Prisma.SkillDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SkillUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SkillUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>[]
          }
          upsert: {
            args: Prisma.SkillUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>
          }
          aggregate: {
            args: Prisma.SkillAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSkill>
          }
          groupBy: {
            args: Prisma.SkillGroupByArgs<ExtArgs>
            result: $Utils.Optional<SkillGroupByOutputType>[]
          }
          count: {
            args: Prisma.SkillCountArgs<ExtArgs>
            result: $Utils.Optional<SkillCountAggregateOutputType> | number
          }
        }
      }
      StudentSkill: {
        payload: Prisma.$StudentSkillPayload<ExtArgs>
        fields: Prisma.StudentSkillFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentSkillFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentSkillPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentSkillFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentSkillPayload>
          }
          findFirst: {
            args: Prisma.StudentSkillFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentSkillPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentSkillFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentSkillPayload>
          }
          findMany: {
            args: Prisma.StudentSkillFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentSkillPayload>[]
          }
          create: {
            args: Prisma.StudentSkillCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentSkillPayload>
          }
          createMany: {
            args: Prisma.StudentSkillCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StudentSkillCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentSkillPayload>[]
          }
          delete: {
            args: Prisma.StudentSkillDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentSkillPayload>
          }
          update: {
            args: Prisma.StudentSkillUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentSkillPayload>
          }
          deleteMany: {
            args: Prisma.StudentSkillDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentSkillUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StudentSkillUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentSkillPayload>[]
          }
          upsert: {
            args: Prisma.StudentSkillUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentSkillPayload>
          }
          aggregate: {
            args: Prisma.StudentSkillAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudentSkill>
          }
          groupBy: {
            args: Prisma.StudentSkillGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentSkillGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentSkillCountArgs<ExtArgs>
            result: $Utils.Optional<StudentSkillCountAggregateOutputType> | number
          }
        }
      }
      PlacementSkill: {
        payload: Prisma.$PlacementSkillPayload<ExtArgs>
        fields: Prisma.PlacementSkillFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlacementSkillFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementSkillPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlacementSkillFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementSkillPayload>
          }
          findFirst: {
            args: Prisma.PlacementSkillFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementSkillPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlacementSkillFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementSkillPayload>
          }
          findMany: {
            args: Prisma.PlacementSkillFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementSkillPayload>[]
          }
          create: {
            args: Prisma.PlacementSkillCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementSkillPayload>
          }
          createMany: {
            args: Prisma.PlacementSkillCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlacementSkillCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementSkillPayload>[]
          }
          delete: {
            args: Prisma.PlacementSkillDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementSkillPayload>
          }
          update: {
            args: Prisma.PlacementSkillUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementSkillPayload>
          }
          deleteMany: {
            args: Prisma.PlacementSkillDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlacementSkillUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlacementSkillUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementSkillPayload>[]
          }
          upsert: {
            args: Prisma.PlacementSkillUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementSkillPayload>
          }
          aggregate: {
            args: Prisma.PlacementSkillAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlacementSkill>
          }
          groupBy: {
            args: Prisma.PlacementSkillGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlacementSkillGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlacementSkillCountArgs<ExtArgs>
            result: $Utils.Optional<PlacementSkillCountAggregateOutputType> | number
          }
        }
      }
      PlacementBranch: {
        payload: Prisma.$PlacementBranchPayload<ExtArgs>
        fields: Prisma.PlacementBranchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlacementBranchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementBranchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlacementBranchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementBranchPayload>
          }
          findFirst: {
            args: Prisma.PlacementBranchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementBranchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlacementBranchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementBranchPayload>
          }
          findMany: {
            args: Prisma.PlacementBranchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementBranchPayload>[]
          }
          create: {
            args: Prisma.PlacementBranchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementBranchPayload>
          }
          createMany: {
            args: Prisma.PlacementBranchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlacementBranchCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementBranchPayload>[]
          }
          delete: {
            args: Prisma.PlacementBranchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementBranchPayload>
          }
          update: {
            args: Prisma.PlacementBranchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementBranchPayload>
          }
          deleteMany: {
            args: Prisma.PlacementBranchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlacementBranchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlacementBranchUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementBranchPayload>[]
          }
          upsert: {
            args: Prisma.PlacementBranchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementBranchPayload>
          }
          aggregate: {
            args: Prisma.PlacementBranchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlacementBranch>
          }
          groupBy: {
            args: Prisma.PlacementBranchGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlacementBranchGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlacementBranchCountArgs<ExtArgs>
            result: $Utils.Optional<PlacementBranchCountAggregateOutputType> | number
          }
        }
      }
      Attachment: {
        payload: Prisma.$AttachmentPayload<ExtArgs>
        fields: Prisma.AttachmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AttachmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AttachmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>
          }
          findFirst: {
            args: Prisma.AttachmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AttachmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>
          }
          findMany: {
            args: Prisma.AttachmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>[]
          }
          create: {
            args: Prisma.AttachmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>
          }
          createMany: {
            args: Prisma.AttachmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AttachmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>[]
          }
          delete: {
            args: Prisma.AttachmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>
          }
          update: {
            args: Prisma.AttachmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>
          }
          deleteMany: {
            args: Prisma.AttachmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AttachmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AttachmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>[]
          }
          upsert: {
            args: Prisma.AttachmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>
          }
          aggregate: {
            args: Prisma.AttachmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAttachment>
          }
          groupBy: {
            args: Prisma.AttachmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AttachmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AttachmentCountArgs<ExtArgs>
            result: $Utils.Optional<AttachmentCountAggregateOutputType> | number
          }
        }
      }
      PlacementChunk: {
        payload: Prisma.$PlacementChunkPayload<ExtArgs>
        fields: Prisma.PlacementChunkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlacementChunkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementChunkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlacementChunkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementChunkPayload>
          }
          findFirst: {
            args: Prisma.PlacementChunkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementChunkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlacementChunkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementChunkPayload>
          }
          findMany: {
            args: Prisma.PlacementChunkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementChunkPayload>[]
          }
          create: {
            args: Prisma.PlacementChunkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementChunkPayload>
          }
          createMany: {
            args: Prisma.PlacementChunkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlacementChunkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementChunkPayload>[]
          }
          delete: {
            args: Prisma.PlacementChunkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementChunkPayload>
          }
          update: {
            args: Prisma.PlacementChunkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementChunkPayload>
          }
          deleteMany: {
            args: Prisma.PlacementChunkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlacementChunkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlacementChunkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementChunkPayload>[]
          }
          upsert: {
            args: Prisma.PlacementChunkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementChunkPayload>
          }
          aggregate: {
            args: Prisma.PlacementChunkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlacementChunk>
          }
          groupBy: {
            args: Prisma.PlacementChunkGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlacementChunkGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlacementChunkCountArgs<ExtArgs>
            result: $Utils.Optional<PlacementChunkCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    company?: CompanyOmit
    placement?: PlacementOmit
    branch?: BranchOmit
    skill?: SkillOmit
    studentSkill?: StudentSkillOmit
    placementSkill?: PlacementSkillOmit
    placementBranch?: PlacementBranchOmit
    attachment?: AttachmentOmit
    placementChunk?: PlacementChunkOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    skills: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    skills?: boolean | UserCountOutputTypeCountSkillsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSkillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentSkillWhereInput
  }


  /**
   * Count Type CompanyCountOutputType
   */

  export type CompanyCountOutputType = {
    placements: number
  }

  export type CompanyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    placements?: boolean | CompanyCountOutputTypeCountPlacementsArgs
  }

  // Custom InputTypes
  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCountOutputType
     */
    select?: CompanyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountPlacementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlacementWhereInput
  }


  /**
   * Count Type PlacementCountOutputType
   */

  export type PlacementCountOutputType = {
    skills: number
    branches: number
    attachments: number
  }

  export type PlacementCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    skills?: boolean | PlacementCountOutputTypeCountSkillsArgs
    branches?: boolean | PlacementCountOutputTypeCountBranchesArgs
    attachments?: boolean | PlacementCountOutputTypeCountAttachmentsArgs
  }

  // Custom InputTypes
  /**
   * PlacementCountOutputType without action
   */
  export type PlacementCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementCountOutputType
     */
    select?: PlacementCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlacementCountOutputType without action
   */
  export type PlacementCountOutputTypeCountSkillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlacementSkillWhereInput
  }

  /**
   * PlacementCountOutputType without action
   */
  export type PlacementCountOutputTypeCountBranchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlacementBranchWhereInput
  }

  /**
   * PlacementCountOutputType without action
   */
  export type PlacementCountOutputTypeCountAttachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttachmentWhereInput
  }


  /**
   * Count Type BranchCountOutputType
   */

  export type BranchCountOutputType = {
    users: number
    placements: number
  }

  export type BranchCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | BranchCountOutputTypeCountUsersArgs
    placements?: boolean | BranchCountOutputTypeCountPlacementsArgs
  }

  // Custom InputTypes
  /**
   * BranchCountOutputType without action
   */
  export type BranchCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchCountOutputType
     */
    select?: BranchCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BranchCountOutputType without action
   */
  export type BranchCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * BranchCountOutputType without action
   */
  export type BranchCountOutputTypeCountPlacementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlacementBranchWhereInput
  }


  /**
   * Count Type SkillCountOutputType
   */

  export type SkillCountOutputType = {
    students: number
    placements: number
  }

  export type SkillCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    students?: boolean | SkillCountOutputTypeCountStudentsArgs
    placements?: boolean | SkillCountOutputTypeCountPlacementsArgs
  }

  // Custom InputTypes
  /**
   * SkillCountOutputType without action
   */
  export type SkillCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillCountOutputType
     */
    select?: SkillCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SkillCountOutputType without action
   */
  export type SkillCountOutputTypeCountStudentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentSkillWhereInput
  }

  /**
   * SkillCountOutputType without action
   */
  export type SkillCountOutputTypeCountPlacementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlacementSkillWhereInput
  }


  /**
   * Count Type AttachmentCountOutputType
   */

  export type AttachmentCountOutputType = {
    chunks: number
  }

  export type AttachmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chunks?: boolean | AttachmentCountOutputTypeCountChunksArgs
  }

  // Custom InputTypes
  /**
   * AttachmentCountOutputType without action
   */
  export type AttachmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttachmentCountOutputType
     */
    select?: AttachmentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AttachmentCountOutputType without action
   */
  export type AttachmentCountOutputTypeCountChunksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlacementChunkWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    cgpa: number | null
    branchId: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
    cgpa: number | null
    branchId: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    passwordHash: string | null
    role: $Enums.Role | null
    name: string | null
    rollNo: string | null
    cgpa: number | null
    institute: $Enums.Institute | null
    phone: string | null
    branchId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    passwordHash: string | null
    role: $Enums.Role | null
    name: string | null
    rollNo: string | null
    cgpa: number | null
    institute: $Enums.Institute | null
    phone: string | null
    branchId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    role: number
    name: number
    rollNo: number
    cgpa: number
    institute: number
    phone: number
    branchId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    cgpa?: true
    branchId?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    cgpa?: true
    branchId?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    role?: true
    name?: true
    rollNo?: true
    cgpa?: true
    institute?: true
    phone?: true
    branchId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    role?: true
    name?: true
    rollNo?: true
    cgpa?: true
    institute?: true
    phone?: true
    branchId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    role?: true
    name?: true
    rollNo?: true
    cgpa?: true
    institute?: true
    phone?: true
    branchId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    passwordHash: string
    role: $Enums.Role
    name: string
    rollNo: string | null
    cgpa: number | null
    institute: $Enums.Institute | null
    phone: string | null
    branchId: number | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    name?: boolean
    rollNo?: boolean
    cgpa?: boolean
    institute?: boolean
    phone?: boolean
    branchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    branch?: boolean | User$branchArgs<ExtArgs>
    skills?: boolean | User$skillsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    name?: boolean
    rollNo?: boolean
    cgpa?: boolean
    institute?: boolean
    phone?: boolean
    branchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    branch?: boolean | User$branchArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    name?: boolean
    rollNo?: boolean
    cgpa?: boolean
    institute?: boolean
    phone?: boolean
    branchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    branch?: boolean | User$branchArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    name?: boolean
    rollNo?: boolean
    cgpa?: boolean
    institute?: boolean
    phone?: boolean
    branchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "passwordHash" | "role" | "name" | "rollNo" | "cgpa" | "institute" | "phone" | "branchId" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    branch?: boolean | User$branchArgs<ExtArgs>
    skills?: boolean | User$skillsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    branch?: boolean | User$branchArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    branch?: boolean | User$branchArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      branch: Prisma.$BranchPayload<ExtArgs> | null
      skills: Prisma.$StudentSkillPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      passwordHash: string
      role: $Enums.Role
      name: string
      rollNo: string | null
      cgpa: number | null
      institute: $Enums.Institute | null
      phone: string | null
      branchId: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    branch<T extends User$branchArgs<ExtArgs> = {}>(args?: Subset<T, User$branchArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    skills<T extends User$skillsArgs<ExtArgs> = {}>(args?: Subset<T, User$skillsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentSkillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly name: FieldRef<"User", 'String'>
    readonly rollNo: FieldRef<"User", 'String'>
    readonly cgpa: FieldRef<"User", 'Float'>
    readonly institute: FieldRef<"User", 'Institute'>
    readonly phone: FieldRef<"User", 'String'>
    readonly branchId: FieldRef<"User", 'Int'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.branch
   */
  export type User$branchArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    where?: BranchWhereInput
  }

  /**
   * User.skills
   */
  export type User$skillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentSkill
     */
    select?: StudentSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentSkill
     */
    omit?: StudentSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentSkillInclude<ExtArgs> | null
    where?: StudentSkillWhereInput
    orderBy?: StudentSkillOrderByWithRelationInput | StudentSkillOrderByWithRelationInput[]
    cursor?: StudentSkillWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StudentSkillScalarFieldEnum | StudentSkillScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Company
   */

  export type AggregateCompany = {
    _count: CompanyCountAggregateOutputType | null
    _avg: CompanyAvgAggregateOutputType | null
    _sum: CompanySumAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  export type CompanyAvgAggregateOutputType = {
    id: number | null
    hiresDepstar: number | null
    hiresCspit: number | null
    avgPackage: number | null
  }

  export type CompanySumAggregateOutputType = {
    id: number | null
    hiresDepstar: number | null
    hiresCspit: number | null
    avgPackage: number | null
  }

  export type CompanyMinAggregateOutputType = {
    id: number | null
    name: string | null
    sector: string | null
    hiresDepstar: number | null
    hiresCspit: number | null
    status: string | null
    avgPackage: number | null
    notes: string | null
    website: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompanyMaxAggregateOutputType = {
    id: number | null
    name: string | null
    sector: string | null
    hiresDepstar: number | null
    hiresCspit: number | null
    status: string | null
    avgPackage: number | null
    notes: string | null
    website: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompanyCountAggregateOutputType = {
    id: number
    name: number
    sector: number
    hiresDepstar: number
    hiresCspit: number
    status: number
    avgPackage: number
    notes: number
    website: number
    hrContacts: number
    visits: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CompanyAvgAggregateInputType = {
    id?: true
    hiresDepstar?: true
    hiresCspit?: true
    avgPackage?: true
  }

  export type CompanySumAggregateInputType = {
    id?: true
    hiresDepstar?: true
    hiresCspit?: true
    avgPackage?: true
  }

  export type CompanyMinAggregateInputType = {
    id?: true
    name?: true
    sector?: true
    hiresDepstar?: true
    hiresCspit?: true
    status?: true
    avgPackage?: true
    notes?: true
    website?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompanyMaxAggregateInputType = {
    id?: true
    name?: true
    sector?: true
    hiresDepstar?: true
    hiresCspit?: true
    status?: true
    avgPackage?: true
    notes?: true
    website?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompanyCountAggregateInputType = {
    id?: true
    name?: true
    sector?: true
    hiresDepstar?: true
    hiresCspit?: true
    status?: true
    avgPackage?: true
    notes?: true
    website?: true
    hrContacts?: true
    visits?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CompanyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Company to aggregate.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Companies
    **/
    _count?: true | CompanyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CompanyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CompanySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyMaxAggregateInputType
  }

  export type GetCompanyAggregateType<T extends CompanyAggregateArgs> = {
        [P in keyof T & keyof AggregateCompany]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompany[P]>
      : GetScalarType<T[P], AggregateCompany[P]>
  }




  export type CompanyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyWhereInput
    orderBy?: CompanyOrderByWithAggregationInput | CompanyOrderByWithAggregationInput[]
    by: CompanyScalarFieldEnum[] | CompanyScalarFieldEnum
    having?: CompanyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyCountAggregateInputType | true
    _avg?: CompanyAvgAggregateInputType
    _sum?: CompanySumAggregateInputType
    _min?: CompanyMinAggregateInputType
    _max?: CompanyMaxAggregateInputType
  }

  export type CompanyGroupByOutputType = {
    id: number
    name: string
    sector: string
    hiresDepstar: number
    hiresCspit: number
    status: string
    avgPackage: number
    notes: string | null
    website: string | null
    hrContacts: JsonValue | null
    visits: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: CompanyCountAggregateOutputType | null
    _avg: CompanyAvgAggregateOutputType | null
    _sum: CompanySumAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  type GetCompanyGroupByPayload<T extends CompanyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyGroupByOutputType[P]>
        }
      >
    >


  export type CompanySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    sector?: boolean
    hiresDepstar?: boolean
    hiresCspit?: boolean
    status?: boolean
    avgPackage?: boolean
    notes?: boolean
    website?: boolean
    hrContacts?: boolean
    visits?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    placements?: boolean | Company$placementsArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type CompanySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    sector?: boolean
    hiresDepstar?: boolean
    hiresCspit?: boolean
    status?: boolean
    avgPackage?: boolean
    notes?: boolean
    website?: boolean
    hrContacts?: boolean
    visits?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["company"]>

  export type CompanySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    sector?: boolean
    hiresDepstar?: boolean
    hiresCspit?: boolean
    status?: boolean
    avgPackage?: boolean
    notes?: boolean
    website?: boolean
    hrContacts?: boolean
    visits?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["company"]>

  export type CompanySelectScalar = {
    id?: boolean
    name?: boolean
    sector?: boolean
    hiresDepstar?: boolean
    hiresCspit?: boolean
    status?: boolean
    avgPackage?: boolean
    notes?: boolean
    website?: boolean
    hrContacts?: boolean
    visits?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CompanyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "sector" | "hiresDepstar" | "hiresCspit" | "status" | "avgPackage" | "notes" | "website" | "hrContacts" | "visits" | "createdAt" | "updatedAt", ExtArgs["result"]["company"]>
  export type CompanyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    placements?: boolean | Company$placementsArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CompanyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CompanyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CompanyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Company"
    objects: {
      placements: Prisma.$PlacementPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      sector: string
      hiresDepstar: number
      hiresCspit: number
      status: string
      avgPackage: number
      notes: string | null
      website: string | null
      hrContacts: Prisma.JsonValue | null
      visits: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["company"]>
    composites: {}
  }

  type CompanyGetPayload<S extends boolean | null | undefined | CompanyDefaultArgs> = $Result.GetResult<Prisma.$CompanyPayload, S>

  type CompanyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompanyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompanyCountAggregateInputType | true
    }

  export interface CompanyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Company'], meta: { name: 'Company' } }
    /**
     * Find zero or one Company that matches the filter.
     * @param {CompanyFindUniqueArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyFindUniqueArgs>(args: SelectSubset<T, CompanyFindUniqueArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Company that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompanyFindUniqueOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyFindFirstArgs>(args?: SelectSubset<T, CompanyFindFirstArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Companies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Companies
     * const companies = await prisma.company.findMany()
     * 
     * // Get first 10 Companies
     * const companies = await prisma.company.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companyWithIdOnly = await prisma.company.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompanyFindManyArgs>(args?: SelectSubset<T, CompanyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Company.
     * @param {CompanyCreateArgs} args - Arguments to create a Company.
     * @example
     * // Create one Company
     * const Company = await prisma.company.create({
     *   data: {
     *     // ... data to create a Company
     *   }
     * })
     * 
     */
    create<T extends CompanyCreateArgs>(args: SelectSubset<T, CompanyCreateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Companies.
     * @param {CompanyCreateManyArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyCreateManyArgs>(args?: SelectSubset<T, CompanyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Companies and returns the data saved in the database.
     * @param {CompanyCreateManyAndReturnArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompanyCreateManyAndReturnArgs>(args?: SelectSubset<T, CompanyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Company.
     * @param {CompanyDeleteArgs} args - Arguments to delete one Company.
     * @example
     * // Delete one Company
     * const Company = await prisma.company.delete({
     *   where: {
     *     // ... filter to delete one Company
     *   }
     * })
     * 
     */
    delete<T extends CompanyDeleteArgs>(args: SelectSubset<T, CompanyDeleteArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Company.
     * @param {CompanyUpdateArgs} args - Arguments to update one Company.
     * @example
     * // Update one Company
     * const company = await prisma.company.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyUpdateArgs>(args: SelectSubset<T, CompanyUpdateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Companies.
     * @param {CompanyDeleteManyArgs} args - Arguments to filter Companies to delete.
     * @example
     * // Delete a few Companies
     * const { count } = await prisma.company.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyDeleteManyArgs>(args?: SelectSubset<T, CompanyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyUpdateManyArgs>(args: SelectSubset<T, CompanyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies and returns the data updated in the database.
     * @param {CompanyUpdateManyAndReturnArgs} args - Arguments to update many Companies.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CompanyUpdateManyAndReturnArgs>(args: SelectSubset<T, CompanyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Company.
     * @param {CompanyUpsertArgs} args - Arguments to update or create a Company.
     * @example
     * // Update or create a Company
     * const company = await prisma.company.upsert({
     *   create: {
     *     // ... data to create a Company
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Company we want to update
     *   }
     * })
     */
    upsert<T extends CompanyUpsertArgs>(args: SelectSubset<T, CompanyUpsertArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCountArgs} args - Arguments to filter Companies to count.
     * @example
     * // Count the number of Companies
     * const count = await prisma.company.count({
     *   where: {
     *     // ... the filter for the Companies we want to count
     *   }
     * })
    **/
    count<T extends CompanyCountArgs>(
      args?: Subset<T, CompanyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompanyAggregateArgs>(args: Subset<T, CompanyAggregateArgs>): Prisma.PrismaPromise<GetCompanyAggregateType<T>>

    /**
     * Group by Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompanyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyGroupByArgs['orderBy'] }
        : { orderBy?: CompanyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompanyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Company model
   */
  readonly fields: CompanyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Company.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    placements<T extends Company$placementsArgs<ExtArgs> = {}>(args?: Subset<T, Company$placementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlacementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Company model
   */
  interface CompanyFieldRefs {
    readonly id: FieldRef<"Company", 'Int'>
    readonly name: FieldRef<"Company", 'String'>
    readonly sector: FieldRef<"Company", 'String'>
    readonly hiresDepstar: FieldRef<"Company", 'Int'>
    readonly hiresCspit: FieldRef<"Company", 'Int'>
    readonly status: FieldRef<"Company", 'String'>
    readonly avgPackage: FieldRef<"Company", 'Float'>
    readonly notes: FieldRef<"Company", 'String'>
    readonly website: FieldRef<"Company", 'String'>
    readonly hrContacts: FieldRef<"Company", 'Json'>
    readonly visits: FieldRef<"Company", 'Json'>
    readonly createdAt: FieldRef<"Company", 'DateTime'>
    readonly updatedAt: FieldRef<"Company", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Company findUnique
   */
  export type CompanyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findUniqueOrThrow
   */
  export type CompanyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findFirst
   */
  export type CompanyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findFirstOrThrow
   */
  export type CompanyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findMany
   */
  export type CompanyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Companies to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company create
   */
  export type CompanyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to create a Company.
     */
    data: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
  }

  /**
   * Company createMany
   */
  export type CompanyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Company createManyAndReturn
   */
  export type CompanyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Company update
   */
  export type CompanyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to update a Company.
     */
    data: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
    /**
     * Choose, which Company to update.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company updateMany
   */
  export type CompanyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
  }

  /**
   * Company updateManyAndReturn
   */
  export type CompanyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
  }

  /**
   * Company upsert
   */
  export type CompanyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The filter to search for the Company to update in case it exists.
     */
    where: CompanyWhereUniqueInput
    /**
     * In case the Company found by the `where` argument doesn't exist, create a new Company with this data.
     */
    create: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
    /**
     * In case the Company was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
  }

  /**
   * Company delete
   */
  export type CompanyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter which Company to delete.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company deleteMany
   */
  export type CompanyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Companies to delete
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to delete.
     */
    limit?: number
  }

  /**
   * Company.placements
   */
  export type Company$placementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Placement
     */
    select?: PlacementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Placement
     */
    omit?: PlacementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementInclude<ExtArgs> | null
    where?: PlacementWhereInput
    orderBy?: PlacementOrderByWithRelationInput | PlacementOrderByWithRelationInput[]
    cursor?: PlacementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlacementScalarFieldEnum | PlacementScalarFieldEnum[]
  }

  /**
   * Company without action
   */
  export type CompanyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
  }


  /**
   * Model Placement
   */

  export type AggregatePlacement = {
    _count: PlacementCountAggregateOutputType | null
    _avg: PlacementAvgAggregateOutputType | null
    _sum: PlacementSumAggregateOutputType | null
    _min: PlacementMinAggregateOutputType | null
    _max: PlacementMaxAggregateOutputType | null
  }

  export type PlacementAvgAggregateOutputType = {
    id: number | null
    companyId: number | null
    ctc: number | null
    cgpaCutoff: number | null
    appliedCount: number | null
    shortlistedCount: number | null
    offeredCount: number | null
  }

  export type PlacementSumAggregateOutputType = {
    id: number | null
    companyId: number | null
    ctc: number | null
    cgpaCutoff: number | null
    appliedCount: number | null
    shortlistedCount: number | null
    offeredCount: number | null
  }

  export type PlacementMinAggregateOutputType = {
    id: number | null
    companyId: number | null
    position: string | null
    ctc: number | null
    deadline: Date | null
    cgpaCutoff: number | null
    description: string | null
    status: string | null
    activeRound: string | null
    appliedCount: number | null
    shortlistedCount: number | null
    offeredCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlacementMaxAggregateOutputType = {
    id: number | null
    companyId: number | null
    position: string | null
    ctc: number | null
    deadline: Date | null
    cgpaCutoff: number | null
    description: string | null
    status: string | null
    activeRound: string | null
    appliedCount: number | null
    shortlistedCount: number | null
    offeredCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlacementCountAggregateOutputType = {
    id: number
    companyId: number
    position: number
    ctc: number
    deadline: number
    cgpaCutoff: number
    description: number
    status: number
    activeRound: number
    appliedCount: number
    shortlistedCount: number
    offeredCount: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PlacementAvgAggregateInputType = {
    id?: true
    companyId?: true
    ctc?: true
    cgpaCutoff?: true
    appliedCount?: true
    shortlistedCount?: true
    offeredCount?: true
  }

  export type PlacementSumAggregateInputType = {
    id?: true
    companyId?: true
    ctc?: true
    cgpaCutoff?: true
    appliedCount?: true
    shortlistedCount?: true
    offeredCount?: true
  }

  export type PlacementMinAggregateInputType = {
    id?: true
    companyId?: true
    position?: true
    ctc?: true
    deadline?: true
    cgpaCutoff?: true
    description?: true
    status?: true
    activeRound?: true
    appliedCount?: true
    shortlistedCount?: true
    offeredCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlacementMaxAggregateInputType = {
    id?: true
    companyId?: true
    position?: true
    ctc?: true
    deadline?: true
    cgpaCutoff?: true
    description?: true
    status?: true
    activeRound?: true
    appliedCount?: true
    shortlistedCount?: true
    offeredCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlacementCountAggregateInputType = {
    id?: true
    companyId?: true
    position?: true
    ctc?: true
    deadline?: true
    cgpaCutoff?: true
    description?: true
    status?: true
    activeRound?: true
    appliedCount?: true
    shortlistedCount?: true
    offeredCount?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PlacementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Placement to aggregate.
     */
    where?: PlacementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Placements to fetch.
     */
    orderBy?: PlacementOrderByWithRelationInput | PlacementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlacementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Placements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Placements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Placements
    **/
    _count?: true | PlacementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlacementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlacementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlacementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlacementMaxAggregateInputType
  }

  export type GetPlacementAggregateType<T extends PlacementAggregateArgs> = {
        [P in keyof T & keyof AggregatePlacement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlacement[P]>
      : GetScalarType<T[P], AggregatePlacement[P]>
  }




  export type PlacementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlacementWhereInput
    orderBy?: PlacementOrderByWithAggregationInput | PlacementOrderByWithAggregationInput[]
    by: PlacementScalarFieldEnum[] | PlacementScalarFieldEnum
    having?: PlacementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlacementCountAggregateInputType | true
    _avg?: PlacementAvgAggregateInputType
    _sum?: PlacementSumAggregateInputType
    _min?: PlacementMinAggregateInputType
    _max?: PlacementMaxAggregateInputType
  }

  export type PlacementGroupByOutputType = {
    id: number
    companyId: number
    position: string
    ctc: number
    deadline: Date
    cgpaCutoff: number
    description: string | null
    status: string
    activeRound: string
    appliedCount: number
    shortlistedCount: number
    offeredCount: number
    createdAt: Date
    updatedAt: Date
    _count: PlacementCountAggregateOutputType | null
    _avg: PlacementAvgAggregateOutputType | null
    _sum: PlacementSumAggregateOutputType | null
    _min: PlacementMinAggregateOutputType | null
    _max: PlacementMaxAggregateOutputType | null
  }

  type GetPlacementGroupByPayload<T extends PlacementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlacementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlacementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlacementGroupByOutputType[P]>
            : GetScalarType<T[P], PlacementGroupByOutputType[P]>
        }
      >
    >


  export type PlacementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    position?: boolean
    ctc?: boolean
    deadline?: boolean
    cgpaCutoff?: boolean
    description?: boolean
    status?: boolean
    activeRound?: boolean
    appliedCount?: boolean
    shortlistedCount?: boolean
    offeredCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    skills?: boolean | Placement$skillsArgs<ExtArgs>
    branches?: boolean | Placement$branchesArgs<ExtArgs>
    attachments?: boolean | Placement$attachmentsArgs<ExtArgs>
    _count?: boolean | PlacementCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["placement"]>

  export type PlacementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    position?: boolean
    ctc?: boolean
    deadline?: boolean
    cgpaCutoff?: boolean
    description?: boolean
    status?: boolean
    activeRound?: boolean
    appliedCount?: boolean
    shortlistedCount?: boolean
    offeredCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["placement"]>

  export type PlacementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    position?: boolean
    ctc?: boolean
    deadline?: boolean
    cgpaCutoff?: boolean
    description?: boolean
    status?: boolean
    activeRound?: boolean
    appliedCount?: boolean
    shortlistedCount?: boolean
    offeredCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["placement"]>

  export type PlacementSelectScalar = {
    id?: boolean
    companyId?: boolean
    position?: boolean
    ctc?: boolean
    deadline?: boolean
    cgpaCutoff?: boolean
    description?: boolean
    status?: boolean
    activeRound?: boolean
    appliedCount?: boolean
    shortlistedCount?: boolean
    offeredCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PlacementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyId" | "position" | "ctc" | "deadline" | "cgpaCutoff" | "description" | "status" | "activeRound" | "appliedCount" | "shortlistedCount" | "offeredCount" | "createdAt" | "updatedAt", ExtArgs["result"]["placement"]>
  export type PlacementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    skills?: boolean | Placement$skillsArgs<ExtArgs>
    branches?: boolean | Placement$branchesArgs<ExtArgs>
    attachments?: boolean | Placement$attachmentsArgs<ExtArgs>
    _count?: boolean | PlacementCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PlacementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type PlacementIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $PlacementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Placement"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      skills: Prisma.$PlacementSkillPayload<ExtArgs>[]
      branches: Prisma.$PlacementBranchPayload<ExtArgs>[]
      attachments: Prisma.$AttachmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      companyId: number
      position: string
      ctc: number
      deadline: Date
      cgpaCutoff: number
      description: string | null
      status: string
      activeRound: string
      appliedCount: number
      shortlistedCount: number
      offeredCount: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["placement"]>
    composites: {}
  }

  type PlacementGetPayload<S extends boolean | null | undefined | PlacementDefaultArgs> = $Result.GetResult<Prisma.$PlacementPayload, S>

  type PlacementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlacementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlacementCountAggregateInputType | true
    }

  export interface PlacementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Placement'], meta: { name: 'Placement' } }
    /**
     * Find zero or one Placement that matches the filter.
     * @param {PlacementFindUniqueArgs} args - Arguments to find a Placement
     * @example
     * // Get one Placement
     * const placement = await prisma.placement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlacementFindUniqueArgs>(args: SelectSubset<T, PlacementFindUniqueArgs<ExtArgs>>): Prisma__PlacementClient<$Result.GetResult<Prisma.$PlacementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Placement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlacementFindUniqueOrThrowArgs} args - Arguments to find a Placement
     * @example
     * // Get one Placement
     * const placement = await prisma.placement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlacementFindUniqueOrThrowArgs>(args: SelectSubset<T, PlacementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlacementClient<$Result.GetResult<Prisma.$PlacementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Placement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlacementFindFirstArgs} args - Arguments to find a Placement
     * @example
     * // Get one Placement
     * const placement = await prisma.placement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlacementFindFirstArgs>(args?: SelectSubset<T, PlacementFindFirstArgs<ExtArgs>>): Prisma__PlacementClient<$Result.GetResult<Prisma.$PlacementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Placement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlacementFindFirstOrThrowArgs} args - Arguments to find a Placement
     * @example
     * // Get one Placement
     * const placement = await prisma.placement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlacementFindFirstOrThrowArgs>(args?: SelectSubset<T, PlacementFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlacementClient<$Result.GetResult<Prisma.$PlacementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Placements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlacementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Placements
     * const placements = await prisma.placement.findMany()
     * 
     * // Get first 10 Placements
     * const placements = await prisma.placement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const placementWithIdOnly = await prisma.placement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlacementFindManyArgs>(args?: SelectSubset<T, PlacementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlacementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Placement.
     * @param {PlacementCreateArgs} args - Arguments to create a Placement.
     * @example
     * // Create one Placement
     * const Placement = await prisma.placement.create({
     *   data: {
     *     // ... data to create a Placement
     *   }
     * })
     * 
     */
    create<T extends PlacementCreateArgs>(args: SelectSubset<T, PlacementCreateArgs<ExtArgs>>): Prisma__PlacementClient<$Result.GetResult<Prisma.$PlacementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Placements.
     * @param {PlacementCreateManyArgs} args - Arguments to create many Placements.
     * @example
     * // Create many Placements
     * const placement = await prisma.placement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlacementCreateManyArgs>(args?: SelectSubset<T, PlacementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Placements and returns the data saved in the database.
     * @param {PlacementCreateManyAndReturnArgs} args - Arguments to create many Placements.
     * @example
     * // Create many Placements
     * const placement = await prisma.placement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Placements and only return the `id`
     * const placementWithIdOnly = await prisma.placement.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlacementCreateManyAndReturnArgs>(args?: SelectSubset<T, PlacementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlacementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Placement.
     * @param {PlacementDeleteArgs} args - Arguments to delete one Placement.
     * @example
     * // Delete one Placement
     * const Placement = await prisma.placement.delete({
     *   where: {
     *     // ... filter to delete one Placement
     *   }
     * })
     * 
     */
    delete<T extends PlacementDeleteArgs>(args: SelectSubset<T, PlacementDeleteArgs<ExtArgs>>): Prisma__PlacementClient<$Result.GetResult<Prisma.$PlacementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Placement.
     * @param {PlacementUpdateArgs} args - Arguments to update one Placement.
     * @example
     * // Update one Placement
     * const placement = await prisma.placement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlacementUpdateArgs>(args: SelectSubset<T, PlacementUpdateArgs<ExtArgs>>): Prisma__PlacementClient<$Result.GetResult<Prisma.$PlacementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Placements.
     * @param {PlacementDeleteManyArgs} args - Arguments to filter Placements to delete.
     * @example
     * // Delete a few Placements
     * const { count } = await prisma.placement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlacementDeleteManyArgs>(args?: SelectSubset<T, PlacementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Placements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlacementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Placements
     * const placement = await prisma.placement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlacementUpdateManyArgs>(args: SelectSubset<T, PlacementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Placements and returns the data updated in the database.
     * @param {PlacementUpdateManyAndReturnArgs} args - Arguments to update many Placements.
     * @example
     * // Update many Placements
     * const placement = await prisma.placement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Placements and only return the `id`
     * const placementWithIdOnly = await prisma.placement.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlacementUpdateManyAndReturnArgs>(args: SelectSubset<T, PlacementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlacementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Placement.
     * @param {PlacementUpsertArgs} args - Arguments to update or create a Placement.
     * @example
     * // Update or create a Placement
     * const placement = await prisma.placement.upsert({
     *   create: {
     *     // ... data to create a Placement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Placement we want to update
     *   }
     * })
     */
    upsert<T extends PlacementUpsertArgs>(args: SelectSubset<T, PlacementUpsertArgs<ExtArgs>>): Prisma__PlacementClient<$Result.GetResult<Prisma.$PlacementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Placements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlacementCountArgs} args - Arguments to filter Placements to count.
     * @example
     * // Count the number of Placements
     * const count = await prisma.placement.count({
     *   where: {
     *     // ... the filter for the Placements we want to count
     *   }
     * })
    **/
    count<T extends PlacementCountArgs>(
      args?: Subset<T, PlacementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlacementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Placement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlacementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlacementAggregateArgs>(args: Subset<T, PlacementAggregateArgs>): Prisma.PrismaPromise<GetPlacementAggregateType<T>>

    /**
     * Group by Placement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlacementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlacementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlacementGroupByArgs['orderBy'] }
        : { orderBy?: PlacementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlacementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlacementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Placement model
   */
  readonly fields: PlacementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Placement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlacementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    skills<T extends Placement$skillsArgs<ExtArgs> = {}>(args?: Subset<T, Placement$skillsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlacementSkillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    branches<T extends Placement$branchesArgs<ExtArgs> = {}>(args?: Subset<T, Placement$branchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlacementBranchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    attachments<T extends Placement$attachmentsArgs<ExtArgs> = {}>(args?: Subset<T, Placement$attachmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Placement model
   */
  interface PlacementFieldRefs {
    readonly id: FieldRef<"Placement", 'Int'>
    readonly companyId: FieldRef<"Placement", 'Int'>
    readonly position: FieldRef<"Placement", 'String'>
    readonly ctc: FieldRef<"Placement", 'Float'>
    readonly deadline: FieldRef<"Placement", 'DateTime'>
    readonly cgpaCutoff: FieldRef<"Placement", 'Float'>
    readonly description: FieldRef<"Placement", 'String'>
    readonly status: FieldRef<"Placement", 'String'>
    readonly activeRound: FieldRef<"Placement", 'String'>
    readonly appliedCount: FieldRef<"Placement", 'Int'>
    readonly shortlistedCount: FieldRef<"Placement", 'Int'>
    readonly offeredCount: FieldRef<"Placement", 'Int'>
    readonly createdAt: FieldRef<"Placement", 'DateTime'>
    readonly updatedAt: FieldRef<"Placement", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Placement findUnique
   */
  export type PlacementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Placement
     */
    select?: PlacementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Placement
     */
    omit?: PlacementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementInclude<ExtArgs> | null
    /**
     * Filter, which Placement to fetch.
     */
    where: PlacementWhereUniqueInput
  }

  /**
   * Placement findUniqueOrThrow
   */
  export type PlacementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Placement
     */
    select?: PlacementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Placement
     */
    omit?: PlacementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementInclude<ExtArgs> | null
    /**
     * Filter, which Placement to fetch.
     */
    where: PlacementWhereUniqueInput
  }

  /**
   * Placement findFirst
   */
  export type PlacementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Placement
     */
    select?: PlacementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Placement
     */
    omit?: PlacementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementInclude<ExtArgs> | null
    /**
     * Filter, which Placement to fetch.
     */
    where?: PlacementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Placements to fetch.
     */
    orderBy?: PlacementOrderByWithRelationInput | PlacementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Placements.
     */
    cursor?: PlacementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Placements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Placements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Placements.
     */
    distinct?: PlacementScalarFieldEnum | PlacementScalarFieldEnum[]
  }

  /**
   * Placement findFirstOrThrow
   */
  export type PlacementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Placement
     */
    select?: PlacementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Placement
     */
    omit?: PlacementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementInclude<ExtArgs> | null
    /**
     * Filter, which Placement to fetch.
     */
    where?: PlacementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Placements to fetch.
     */
    orderBy?: PlacementOrderByWithRelationInput | PlacementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Placements.
     */
    cursor?: PlacementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Placements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Placements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Placements.
     */
    distinct?: PlacementScalarFieldEnum | PlacementScalarFieldEnum[]
  }

  /**
   * Placement findMany
   */
  export type PlacementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Placement
     */
    select?: PlacementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Placement
     */
    omit?: PlacementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementInclude<ExtArgs> | null
    /**
     * Filter, which Placements to fetch.
     */
    where?: PlacementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Placements to fetch.
     */
    orderBy?: PlacementOrderByWithRelationInput | PlacementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Placements.
     */
    cursor?: PlacementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Placements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Placements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Placements.
     */
    distinct?: PlacementScalarFieldEnum | PlacementScalarFieldEnum[]
  }

  /**
   * Placement create
   */
  export type PlacementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Placement
     */
    select?: PlacementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Placement
     */
    omit?: PlacementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementInclude<ExtArgs> | null
    /**
     * The data needed to create a Placement.
     */
    data: XOR<PlacementCreateInput, PlacementUncheckedCreateInput>
  }

  /**
   * Placement createMany
   */
  export type PlacementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Placements.
     */
    data: PlacementCreateManyInput | PlacementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Placement createManyAndReturn
   */
  export type PlacementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Placement
     */
    select?: PlacementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Placement
     */
    omit?: PlacementOmit<ExtArgs> | null
    /**
     * The data used to create many Placements.
     */
    data: PlacementCreateManyInput | PlacementCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Placement update
   */
  export type PlacementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Placement
     */
    select?: PlacementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Placement
     */
    omit?: PlacementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementInclude<ExtArgs> | null
    /**
     * The data needed to update a Placement.
     */
    data: XOR<PlacementUpdateInput, PlacementUncheckedUpdateInput>
    /**
     * Choose, which Placement to update.
     */
    where: PlacementWhereUniqueInput
  }

  /**
   * Placement updateMany
   */
  export type PlacementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Placements.
     */
    data: XOR<PlacementUpdateManyMutationInput, PlacementUncheckedUpdateManyInput>
    /**
     * Filter which Placements to update
     */
    where?: PlacementWhereInput
    /**
     * Limit how many Placements to update.
     */
    limit?: number
  }

  /**
   * Placement updateManyAndReturn
   */
  export type PlacementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Placement
     */
    select?: PlacementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Placement
     */
    omit?: PlacementOmit<ExtArgs> | null
    /**
     * The data used to update Placements.
     */
    data: XOR<PlacementUpdateManyMutationInput, PlacementUncheckedUpdateManyInput>
    /**
     * Filter which Placements to update
     */
    where?: PlacementWhereInput
    /**
     * Limit how many Placements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Placement upsert
   */
  export type PlacementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Placement
     */
    select?: PlacementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Placement
     */
    omit?: PlacementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementInclude<ExtArgs> | null
    /**
     * The filter to search for the Placement to update in case it exists.
     */
    where: PlacementWhereUniqueInput
    /**
     * In case the Placement found by the `where` argument doesn't exist, create a new Placement with this data.
     */
    create: XOR<PlacementCreateInput, PlacementUncheckedCreateInput>
    /**
     * In case the Placement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlacementUpdateInput, PlacementUncheckedUpdateInput>
  }

  /**
   * Placement delete
   */
  export type PlacementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Placement
     */
    select?: PlacementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Placement
     */
    omit?: PlacementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementInclude<ExtArgs> | null
    /**
     * Filter which Placement to delete.
     */
    where: PlacementWhereUniqueInput
  }

  /**
   * Placement deleteMany
   */
  export type PlacementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Placements to delete
     */
    where?: PlacementWhereInput
    /**
     * Limit how many Placements to delete.
     */
    limit?: number
  }

  /**
   * Placement.skills
   */
  export type Placement$skillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementSkill
     */
    select?: PlacementSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementSkill
     */
    omit?: PlacementSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementSkillInclude<ExtArgs> | null
    where?: PlacementSkillWhereInput
    orderBy?: PlacementSkillOrderByWithRelationInput | PlacementSkillOrderByWithRelationInput[]
    cursor?: PlacementSkillWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlacementSkillScalarFieldEnum | PlacementSkillScalarFieldEnum[]
  }

  /**
   * Placement.branches
   */
  export type Placement$branchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementBranch
     */
    select?: PlacementBranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementBranch
     */
    omit?: PlacementBranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementBranchInclude<ExtArgs> | null
    where?: PlacementBranchWhereInput
    orderBy?: PlacementBranchOrderByWithRelationInput | PlacementBranchOrderByWithRelationInput[]
    cursor?: PlacementBranchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlacementBranchScalarFieldEnum | PlacementBranchScalarFieldEnum[]
  }

  /**
   * Placement.attachments
   */
  export type Placement$attachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    where?: AttachmentWhereInput
    orderBy?: AttachmentOrderByWithRelationInput | AttachmentOrderByWithRelationInput[]
    cursor?: AttachmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttachmentScalarFieldEnum | AttachmentScalarFieldEnum[]
  }

  /**
   * Placement without action
   */
  export type PlacementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Placement
     */
    select?: PlacementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Placement
     */
    omit?: PlacementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementInclude<ExtArgs> | null
  }


  /**
   * Model Branch
   */

  export type AggregateBranch = {
    _count: BranchCountAggregateOutputType | null
    _avg: BranchAvgAggregateOutputType | null
    _sum: BranchSumAggregateOutputType | null
    _min: BranchMinAggregateOutputType | null
    _max: BranchMaxAggregateOutputType | null
  }

  export type BranchAvgAggregateOutputType = {
    id: number | null
  }

  export type BranchSumAggregateOutputType = {
    id: number | null
  }

  export type BranchMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type BranchMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type BranchCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type BranchAvgAggregateInputType = {
    id?: true
  }

  export type BranchSumAggregateInputType = {
    id?: true
  }

  export type BranchMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type BranchMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type BranchCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type BranchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Branch to aggregate.
     */
    where?: BranchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Branches to fetch.
     */
    orderBy?: BranchOrderByWithRelationInput | BranchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BranchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Branches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Branches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Branches
    **/
    _count?: true | BranchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BranchAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BranchSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BranchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BranchMaxAggregateInputType
  }

  export type GetBranchAggregateType<T extends BranchAggregateArgs> = {
        [P in keyof T & keyof AggregateBranch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBranch[P]>
      : GetScalarType<T[P], AggregateBranch[P]>
  }




  export type BranchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BranchWhereInput
    orderBy?: BranchOrderByWithAggregationInput | BranchOrderByWithAggregationInput[]
    by: BranchScalarFieldEnum[] | BranchScalarFieldEnum
    having?: BranchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BranchCountAggregateInputType | true
    _avg?: BranchAvgAggregateInputType
    _sum?: BranchSumAggregateInputType
    _min?: BranchMinAggregateInputType
    _max?: BranchMaxAggregateInputType
  }

  export type BranchGroupByOutputType = {
    id: number
    name: string
    _count: BranchCountAggregateOutputType | null
    _avg: BranchAvgAggregateOutputType | null
    _sum: BranchSumAggregateOutputType | null
    _min: BranchMinAggregateOutputType | null
    _max: BranchMaxAggregateOutputType | null
  }

  type GetBranchGroupByPayload<T extends BranchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BranchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BranchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BranchGroupByOutputType[P]>
            : GetScalarType<T[P], BranchGroupByOutputType[P]>
        }
      >
    >


  export type BranchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    users?: boolean | Branch$usersArgs<ExtArgs>
    placements?: boolean | Branch$placementsArgs<ExtArgs>
    _count?: boolean | BranchCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["branch"]>

  export type BranchSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["branch"]>

  export type BranchSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["branch"]>

  export type BranchSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type BranchOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["branch"]>
  export type BranchInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Branch$usersArgs<ExtArgs>
    placements?: boolean | Branch$placementsArgs<ExtArgs>
    _count?: boolean | BranchCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BranchIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type BranchIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BranchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Branch"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
      placements: Prisma.$PlacementBranchPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
    }, ExtArgs["result"]["branch"]>
    composites: {}
  }

  type BranchGetPayload<S extends boolean | null | undefined | BranchDefaultArgs> = $Result.GetResult<Prisma.$BranchPayload, S>

  type BranchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BranchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BranchCountAggregateInputType | true
    }

  export interface BranchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Branch'], meta: { name: 'Branch' } }
    /**
     * Find zero or one Branch that matches the filter.
     * @param {BranchFindUniqueArgs} args - Arguments to find a Branch
     * @example
     * // Get one Branch
     * const branch = await prisma.branch.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BranchFindUniqueArgs>(args: SelectSubset<T, BranchFindUniqueArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Branch that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BranchFindUniqueOrThrowArgs} args - Arguments to find a Branch
     * @example
     * // Get one Branch
     * const branch = await prisma.branch.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BranchFindUniqueOrThrowArgs>(args: SelectSubset<T, BranchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Branch that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchFindFirstArgs} args - Arguments to find a Branch
     * @example
     * // Get one Branch
     * const branch = await prisma.branch.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BranchFindFirstArgs>(args?: SelectSubset<T, BranchFindFirstArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Branch that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchFindFirstOrThrowArgs} args - Arguments to find a Branch
     * @example
     * // Get one Branch
     * const branch = await prisma.branch.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BranchFindFirstOrThrowArgs>(args?: SelectSubset<T, BranchFindFirstOrThrowArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Branches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Branches
     * const branches = await prisma.branch.findMany()
     * 
     * // Get first 10 Branches
     * const branches = await prisma.branch.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const branchWithIdOnly = await prisma.branch.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BranchFindManyArgs>(args?: SelectSubset<T, BranchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Branch.
     * @param {BranchCreateArgs} args - Arguments to create a Branch.
     * @example
     * // Create one Branch
     * const Branch = await prisma.branch.create({
     *   data: {
     *     // ... data to create a Branch
     *   }
     * })
     * 
     */
    create<T extends BranchCreateArgs>(args: SelectSubset<T, BranchCreateArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Branches.
     * @param {BranchCreateManyArgs} args - Arguments to create many Branches.
     * @example
     * // Create many Branches
     * const branch = await prisma.branch.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BranchCreateManyArgs>(args?: SelectSubset<T, BranchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Branches and returns the data saved in the database.
     * @param {BranchCreateManyAndReturnArgs} args - Arguments to create many Branches.
     * @example
     * // Create many Branches
     * const branch = await prisma.branch.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Branches and only return the `id`
     * const branchWithIdOnly = await prisma.branch.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BranchCreateManyAndReturnArgs>(args?: SelectSubset<T, BranchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Branch.
     * @param {BranchDeleteArgs} args - Arguments to delete one Branch.
     * @example
     * // Delete one Branch
     * const Branch = await prisma.branch.delete({
     *   where: {
     *     // ... filter to delete one Branch
     *   }
     * })
     * 
     */
    delete<T extends BranchDeleteArgs>(args: SelectSubset<T, BranchDeleteArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Branch.
     * @param {BranchUpdateArgs} args - Arguments to update one Branch.
     * @example
     * // Update one Branch
     * const branch = await prisma.branch.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BranchUpdateArgs>(args: SelectSubset<T, BranchUpdateArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Branches.
     * @param {BranchDeleteManyArgs} args - Arguments to filter Branches to delete.
     * @example
     * // Delete a few Branches
     * const { count } = await prisma.branch.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BranchDeleteManyArgs>(args?: SelectSubset<T, BranchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Branches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Branches
     * const branch = await prisma.branch.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BranchUpdateManyArgs>(args: SelectSubset<T, BranchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Branches and returns the data updated in the database.
     * @param {BranchUpdateManyAndReturnArgs} args - Arguments to update many Branches.
     * @example
     * // Update many Branches
     * const branch = await prisma.branch.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Branches and only return the `id`
     * const branchWithIdOnly = await prisma.branch.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BranchUpdateManyAndReturnArgs>(args: SelectSubset<T, BranchUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Branch.
     * @param {BranchUpsertArgs} args - Arguments to update or create a Branch.
     * @example
     * // Update or create a Branch
     * const branch = await prisma.branch.upsert({
     *   create: {
     *     // ... data to create a Branch
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Branch we want to update
     *   }
     * })
     */
    upsert<T extends BranchUpsertArgs>(args: SelectSubset<T, BranchUpsertArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Branches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchCountArgs} args - Arguments to filter Branches to count.
     * @example
     * // Count the number of Branches
     * const count = await prisma.branch.count({
     *   where: {
     *     // ... the filter for the Branches we want to count
     *   }
     * })
    **/
    count<T extends BranchCountArgs>(
      args?: Subset<T, BranchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BranchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Branch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BranchAggregateArgs>(args: Subset<T, BranchAggregateArgs>): Prisma.PrismaPromise<GetBranchAggregateType<T>>

    /**
     * Group by Branch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BranchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BranchGroupByArgs['orderBy'] }
        : { orderBy?: BranchGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BranchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBranchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Branch model
   */
  readonly fields: BranchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Branch.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BranchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Branch$usersArgs<ExtArgs> = {}>(args?: Subset<T, Branch$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    placements<T extends Branch$placementsArgs<ExtArgs> = {}>(args?: Subset<T, Branch$placementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlacementBranchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Branch model
   */
  interface BranchFieldRefs {
    readonly id: FieldRef<"Branch", 'Int'>
    readonly name: FieldRef<"Branch", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Branch findUnique
   */
  export type BranchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * Filter, which Branch to fetch.
     */
    where: BranchWhereUniqueInput
  }

  /**
   * Branch findUniqueOrThrow
   */
  export type BranchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * Filter, which Branch to fetch.
     */
    where: BranchWhereUniqueInput
  }

  /**
   * Branch findFirst
   */
  export type BranchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * Filter, which Branch to fetch.
     */
    where?: BranchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Branches to fetch.
     */
    orderBy?: BranchOrderByWithRelationInput | BranchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Branches.
     */
    cursor?: BranchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Branches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Branches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Branches.
     */
    distinct?: BranchScalarFieldEnum | BranchScalarFieldEnum[]
  }

  /**
   * Branch findFirstOrThrow
   */
  export type BranchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * Filter, which Branch to fetch.
     */
    where?: BranchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Branches to fetch.
     */
    orderBy?: BranchOrderByWithRelationInput | BranchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Branches.
     */
    cursor?: BranchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Branches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Branches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Branches.
     */
    distinct?: BranchScalarFieldEnum | BranchScalarFieldEnum[]
  }

  /**
   * Branch findMany
   */
  export type BranchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * Filter, which Branches to fetch.
     */
    where?: BranchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Branches to fetch.
     */
    orderBy?: BranchOrderByWithRelationInput | BranchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Branches.
     */
    cursor?: BranchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Branches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Branches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Branches.
     */
    distinct?: BranchScalarFieldEnum | BranchScalarFieldEnum[]
  }

  /**
   * Branch create
   */
  export type BranchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * The data needed to create a Branch.
     */
    data: XOR<BranchCreateInput, BranchUncheckedCreateInput>
  }

  /**
   * Branch createMany
   */
  export type BranchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Branches.
     */
    data: BranchCreateManyInput | BranchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Branch createManyAndReturn
   */
  export type BranchCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * The data used to create many Branches.
     */
    data: BranchCreateManyInput | BranchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Branch update
   */
  export type BranchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * The data needed to update a Branch.
     */
    data: XOR<BranchUpdateInput, BranchUncheckedUpdateInput>
    /**
     * Choose, which Branch to update.
     */
    where: BranchWhereUniqueInput
  }

  /**
   * Branch updateMany
   */
  export type BranchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Branches.
     */
    data: XOR<BranchUpdateManyMutationInput, BranchUncheckedUpdateManyInput>
    /**
     * Filter which Branches to update
     */
    where?: BranchWhereInput
    /**
     * Limit how many Branches to update.
     */
    limit?: number
  }

  /**
   * Branch updateManyAndReturn
   */
  export type BranchUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * The data used to update Branches.
     */
    data: XOR<BranchUpdateManyMutationInput, BranchUncheckedUpdateManyInput>
    /**
     * Filter which Branches to update
     */
    where?: BranchWhereInput
    /**
     * Limit how many Branches to update.
     */
    limit?: number
  }

  /**
   * Branch upsert
   */
  export type BranchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * The filter to search for the Branch to update in case it exists.
     */
    where: BranchWhereUniqueInput
    /**
     * In case the Branch found by the `where` argument doesn't exist, create a new Branch with this data.
     */
    create: XOR<BranchCreateInput, BranchUncheckedCreateInput>
    /**
     * In case the Branch was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BranchUpdateInput, BranchUncheckedUpdateInput>
  }

  /**
   * Branch delete
   */
  export type BranchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * Filter which Branch to delete.
     */
    where: BranchWhereUniqueInput
  }

  /**
   * Branch deleteMany
   */
  export type BranchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Branches to delete
     */
    where?: BranchWhereInput
    /**
     * Limit how many Branches to delete.
     */
    limit?: number
  }

  /**
   * Branch.users
   */
  export type Branch$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Branch.placements
   */
  export type Branch$placementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementBranch
     */
    select?: PlacementBranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementBranch
     */
    omit?: PlacementBranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementBranchInclude<ExtArgs> | null
    where?: PlacementBranchWhereInput
    orderBy?: PlacementBranchOrderByWithRelationInput | PlacementBranchOrderByWithRelationInput[]
    cursor?: PlacementBranchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlacementBranchScalarFieldEnum | PlacementBranchScalarFieldEnum[]
  }

  /**
   * Branch without action
   */
  export type BranchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
  }


  /**
   * Model Skill
   */

  export type AggregateSkill = {
    _count: SkillCountAggregateOutputType | null
    _avg: SkillAvgAggregateOutputType | null
    _sum: SkillSumAggregateOutputType | null
    _min: SkillMinAggregateOutputType | null
    _max: SkillMaxAggregateOutputType | null
  }

  export type SkillAvgAggregateOutputType = {
    id: number | null
  }

  export type SkillSumAggregateOutputType = {
    id: number | null
  }

  export type SkillMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type SkillMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type SkillCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type SkillAvgAggregateInputType = {
    id?: true
  }

  export type SkillSumAggregateInputType = {
    id?: true
  }

  export type SkillMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type SkillMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type SkillCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type SkillAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Skill to aggregate.
     */
    where?: SkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Skills to fetch.
     */
    orderBy?: SkillOrderByWithRelationInput | SkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Skills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Skills
    **/
    _count?: true | SkillCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SkillAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SkillSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SkillMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SkillMaxAggregateInputType
  }

  export type GetSkillAggregateType<T extends SkillAggregateArgs> = {
        [P in keyof T & keyof AggregateSkill]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSkill[P]>
      : GetScalarType<T[P], AggregateSkill[P]>
  }




  export type SkillGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SkillWhereInput
    orderBy?: SkillOrderByWithAggregationInput | SkillOrderByWithAggregationInput[]
    by: SkillScalarFieldEnum[] | SkillScalarFieldEnum
    having?: SkillScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SkillCountAggregateInputType | true
    _avg?: SkillAvgAggregateInputType
    _sum?: SkillSumAggregateInputType
    _min?: SkillMinAggregateInputType
    _max?: SkillMaxAggregateInputType
  }

  export type SkillGroupByOutputType = {
    id: number
    name: string
    _count: SkillCountAggregateOutputType | null
    _avg: SkillAvgAggregateOutputType | null
    _sum: SkillSumAggregateOutputType | null
    _min: SkillMinAggregateOutputType | null
    _max: SkillMaxAggregateOutputType | null
  }

  type GetSkillGroupByPayload<T extends SkillGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SkillGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SkillGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SkillGroupByOutputType[P]>
            : GetScalarType<T[P], SkillGroupByOutputType[P]>
        }
      >
    >


  export type SkillSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    students?: boolean | Skill$studentsArgs<ExtArgs>
    placements?: boolean | Skill$placementsArgs<ExtArgs>
    _count?: boolean | SkillCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["skill"]>

  export type SkillSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["skill"]>

  export type SkillSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["skill"]>

  export type SkillSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type SkillOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["skill"]>
  export type SkillInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    students?: boolean | Skill$studentsArgs<ExtArgs>
    placements?: boolean | Skill$placementsArgs<ExtArgs>
    _count?: boolean | SkillCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SkillIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SkillIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SkillPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Skill"
    objects: {
      students: Prisma.$StudentSkillPayload<ExtArgs>[]
      placements: Prisma.$PlacementSkillPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
    }, ExtArgs["result"]["skill"]>
    composites: {}
  }

  type SkillGetPayload<S extends boolean | null | undefined | SkillDefaultArgs> = $Result.GetResult<Prisma.$SkillPayload, S>

  type SkillCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SkillFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SkillCountAggregateInputType | true
    }

  export interface SkillDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Skill'], meta: { name: 'Skill' } }
    /**
     * Find zero or one Skill that matches the filter.
     * @param {SkillFindUniqueArgs} args - Arguments to find a Skill
     * @example
     * // Get one Skill
     * const skill = await prisma.skill.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SkillFindUniqueArgs>(args: SelectSubset<T, SkillFindUniqueArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Skill that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SkillFindUniqueOrThrowArgs} args - Arguments to find a Skill
     * @example
     * // Get one Skill
     * const skill = await prisma.skill.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SkillFindUniqueOrThrowArgs>(args: SelectSubset<T, SkillFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Skill that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillFindFirstArgs} args - Arguments to find a Skill
     * @example
     * // Get one Skill
     * const skill = await prisma.skill.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SkillFindFirstArgs>(args?: SelectSubset<T, SkillFindFirstArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Skill that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillFindFirstOrThrowArgs} args - Arguments to find a Skill
     * @example
     * // Get one Skill
     * const skill = await prisma.skill.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SkillFindFirstOrThrowArgs>(args?: SelectSubset<T, SkillFindFirstOrThrowArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Skills that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Skills
     * const skills = await prisma.skill.findMany()
     * 
     * // Get first 10 Skills
     * const skills = await prisma.skill.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const skillWithIdOnly = await prisma.skill.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SkillFindManyArgs>(args?: SelectSubset<T, SkillFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Skill.
     * @param {SkillCreateArgs} args - Arguments to create a Skill.
     * @example
     * // Create one Skill
     * const Skill = await prisma.skill.create({
     *   data: {
     *     // ... data to create a Skill
     *   }
     * })
     * 
     */
    create<T extends SkillCreateArgs>(args: SelectSubset<T, SkillCreateArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Skills.
     * @param {SkillCreateManyArgs} args - Arguments to create many Skills.
     * @example
     * // Create many Skills
     * const skill = await prisma.skill.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SkillCreateManyArgs>(args?: SelectSubset<T, SkillCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Skills and returns the data saved in the database.
     * @param {SkillCreateManyAndReturnArgs} args - Arguments to create many Skills.
     * @example
     * // Create many Skills
     * const skill = await prisma.skill.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Skills and only return the `id`
     * const skillWithIdOnly = await prisma.skill.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SkillCreateManyAndReturnArgs>(args?: SelectSubset<T, SkillCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Skill.
     * @param {SkillDeleteArgs} args - Arguments to delete one Skill.
     * @example
     * // Delete one Skill
     * const Skill = await prisma.skill.delete({
     *   where: {
     *     // ... filter to delete one Skill
     *   }
     * })
     * 
     */
    delete<T extends SkillDeleteArgs>(args: SelectSubset<T, SkillDeleteArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Skill.
     * @param {SkillUpdateArgs} args - Arguments to update one Skill.
     * @example
     * // Update one Skill
     * const skill = await prisma.skill.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SkillUpdateArgs>(args: SelectSubset<T, SkillUpdateArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Skills.
     * @param {SkillDeleteManyArgs} args - Arguments to filter Skills to delete.
     * @example
     * // Delete a few Skills
     * const { count } = await prisma.skill.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SkillDeleteManyArgs>(args?: SelectSubset<T, SkillDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Skills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Skills
     * const skill = await prisma.skill.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SkillUpdateManyArgs>(args: SelectSubset<T, SkillUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Skills and returns the data updated in the database.
     * @param {SkillUpdateManyAndReturnArgs} args - Arguments to update many Skills.
     * @example
     * // Update many Skills
     * const skill = await prisma.skill.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Skills and only return the `id`
     * const skillWithIdOnly = await prisma.skill.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SkillUpdateManyAndReturnArgs>(args: SelectSubset<T, SkillUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Skill.
     * @param {SkillUpsertArgs} args - Arguments to update or create a Skill.
     * @example
     * // Update or create a Skill
     * const skill = await prisma.skill.upsert({
     *   create: {
     *     // ... data to create a Skill
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Skill we want to update
     *   }
     * })
     */
    upsert<T extends SkillUpsertArgs>(args: SelectSubset<T, SkillUpsertArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Skills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillCountArgs} args - Arguments to filter Skills to count.
     * @example
     * // Count the number of Skills
     * const count = await prisma.skill.count({
     *   where: {
     *     // ... the filter for the Skills we want to count
     *   }
     * })
    **/
    count<T extends SkillCountArgs>(
      args?: Subset<T, SkillCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SkillCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Skill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SkillAggregateArgs>(args: Subset<T, SkillAggregateArgs>): Prisma.PrismaPromise<GetSkillAggregateType<T>>

    /**
     * Group by Skill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SkillGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SkillGroupByArgs['orderBy'] }
        : { orderBy?: SkillGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SkillGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSkillGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Skill model
   */
  readonly fields: SkillFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Skill.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SkillClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    students<T extends Skill$studentsArgs<ExtArgs> = {}>(args?: Subset<T, Skill$studentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentSkillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    placements<T extends Skill$placementsArgs<ExtArgs> = {}>(args?: Subset<T, Skill$placementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlacementSkillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Skill model
   */
  interface SkillFieldRefs {
    readonly id: FieldRef<"Skill", 'Int'>
    readonly name: FieldRef<"Skill", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Skill findUnique
   */
  export type SkillFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * Filter, which Skill to fetch.
     */
    where: SkillWhereUniqueInput
  }

  /**
   * Skill findUniqueOrThrow
   */
  export type SkillFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * Filter, which Skill to fetch.
     */
    where: SkillWhereUniqueInput
  }

  /**
   * Skill findFirst
   */
  export type SkillFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * Filter, which Skill to fetch.
     */
    where?: SkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Skills to fetch.
     */
    orderBy?: SkillOrderByWithRelationInput | SkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Skills.
     */
    cursor?: SkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Skills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Skills.
     */
    distinct?: SkillScalarFieldEnum | SkillScalarFieldEnum[]
  }

  /**
   * Skill findFirstOrThrow
   */
  export type SkillFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * Filter, which Skill to fetch.
     */
    where?: SkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Skills to fetch.
     */
    orderBy?: SkillOrderByWithRelationInput | SkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Skills.
     */
    cursor?: SkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Skills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Skills.
     */
    distinct?: SkillScalarFieldEnum | SkillScalarFieldEnum[]
  }

  /**
   * Skill findMany
   */
  export type SkillFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * Filter, which Skills to fetch.
     */
    where?: SkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Skills to fetch.
     */
    orderBy?: SkillOrderByWithRelationInput | SkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Skills.
     */
    cursor?: SkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Skills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Skills.
     */
    distinct?: SkillScalarFieldEnum | SkillScalarFieldEnum[]
  }

  /**
   * Skill create
   */
  export type SkillCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * The data needed to create a Skill.
     */
    data: XOR<SkillCreateInput, SkillUncheckedCreateInput>
  }

  /**
   * Skill createMany
   */
  export type SkillCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Skills.
     */
    data: SkillCreateManyInput | SkillCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Skill createManyAndReturn
   */
  export type SkillCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * The data used to create many Skills.
     */
    data: SkillCreateManyInput | SkillCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Skill update
   */
  export type SkillUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * The data needed to update a Skill.
     */
    data: XOR<SkillUpdateInput, SkillUncheckedUpdateInput>
    /**
     * Choose, which Skill to update.
     */
    where: SkillWhereUniqueInput
  }

  /**
   * Skill updateMany
   */
  export type SkillUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Skills.
     */
    data: XOR<SkillUpdateManyMutationInput, SkillUncheckedUpdateManyInput>
    /**
     * Filter which Skills to update
     */
    where?: SkillWhereInput
    /**
     * Limit how many Skills to update.
     */
    limit?: number
  }

  /**
   * Skill updateManyAndReturn
   */
  export type SkillUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * The data used to update Skills.
     */
    data: XOR<SkillUpdateManyMutationInput, SkillUncheckedUpdateManyInput>
    /**
     * Filter which Skills to update
     */
    where?: SkillWhereInput
    /**
     * Limit how many Skills to update.
     */
    limit?: number
  }

  /**
   * Skill upsert
   */
  export type SkillUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * The filter to search for the Skill to update in case it exists.
     */
    where: SkillWhereUniqueInput
    /**
     * In case the Skill found by the `where` argument doesn't exist, create a new Skill with this data.
     */
    create: XOR<SkillCreateInput, SkillUncheckedCreateInput>
    /**
     * In case the Skill was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SkillUpdateInput, SkillUncheckedUpdateInput>
  }

  /**
   * Skill delete
   */
  export type SkillDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * Filter which Skill to delete.
     */
    where: SkillWhereUniqueInput
  }

  /**
   * Skill deleteMany
   */
  export type SkillDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Skills to delete
     */
    where?: SkillWhereInput
    /**
     * Limit how many Skills to delete.
     */
    limit?: number
  }

  /**
   * Skill.students
   */
  export type Skill$studentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentSkill
     */
    select?: StudentSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentSkill
     */
    omit?: StudentSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentSkillInclude<ExtArgs> | null
    where?: StudentSkillWhereInput
    orderBy?: StudentSkillOrderByWithRelationInput | StudentSkillOrderByWithRelationInput[]
    cursor?: StudentSkillWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StudentSkillScalarFieldEnum | StudentSkillScalarFieldEnum[]
  }

  /**
   * Skill.placements
   */
  export type Skill$placementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementSkill
     */
    select?: PlacementSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementSkill
     */
    omit?: PlacementSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementSkillInclude<ExtArgs> | null
    where?: PlacementSkillWhereInput
    orderBy?: PlacementSkillOrderByWithRelationInput | PlacementSkillOrderByWithRelationInput[]
    cursor?: PlacementSkillWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlacementSkillScalarFieldEnum | PlacementSkillScalarFieldEnum[]
  }

  /**
   * Skill without action
   */
  export type SkillDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
  }


  /**
   * Model StudentSkill
   */

  export type AggregateStudentSkill = {
    _count: StudentSkillCountAggregateOutputType | null
    _avg: StudentSkillAvgAggregateOutputType | null
    _sum: StudentSkillSumAggregateOutputType | null
    _min: StudentSkillMinAggregateOutputType | null
    _max: StudentSkillMaxAggregateOutputType | null
  }

  export type StudentSkillAvgAggregateOutputType = {
    userId: number | null
    skillId: number | null
  }

  export type StudentSkillSumAggregateOutputType = {
    userId: number | null
    skillId: number | null
  }

  export type StudentSkillMinAggregateOutputType = {
    userId: number | null
    skillId: number | null
  }

  export type StudentSkillMaxAggregateOutputType = {
    userId: number | null
    skillId: number | null
  }

  export type StudentSkillCountAggregateOutputType = {
    userId: number
    skillId: number
    _all: number
  }


  export type StudentSkillAvgAggregateInputType = {
    userId?: true
    skillId?: true
  }

  export type StudentSkillSumAggregateInputType = {
    userId?: true
    skillId?: true
  }

  export type StudentSkillMinAggregateInputType = {
    userId?: true
    skillId?: true
  }

  export type StudentSkillMaxAggregateInputType = {
    userId?: true
    skillId?: true
  }

  export type StudentSkillCountAggregateInputType = {
    userId?: true
    skillId?: true
    _all?: true
  }

  export type StudentSkillAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StudentSkill to aggregate.
     */
    where?: StudentSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentSkills to fetch.
     */
    orderBy?: StudentSkillOrderByWithRelationInput | StudentSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StudentSkills
    **/
    _count?: true | StudentSkillCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StudentSkillAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StudentSkillSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentSkillMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentSkillMaxAggregateInputType
  }

  export type GetStudentSkillAggregateType<T extends StudentSkillAggregateArgs> = {
        [P in keyof T & keyof AggregateStudentSkill]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudentSkill[P]>
      : GetScalarType<T[P], AggregateStudentSkill[P]>
  }




  export type StudentSkillGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentSkillWhereInput
    orderBy?: StudentSkillOrderByWithAggregationInput | StudentSkillOrderByWithAggregationInput[]
    by: StudentSkillScalarFieldEnum[] | StudentSkillScalarFieldEnum
    having?: StudentSkillScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentSkillCountAggregateInputType | true
    _avg?: StudentSkillAvgAggregateInputType
    _sum?: StudentSkillSumAggregateInputType
    _min?: StudentSkillMinAggregateInputType
    _max?: StudentSkillMaxAggregateInputType
  }

  export type StudentSkillGroupByOutputType = {
    userId: number
    skillId: number
    _count: StudentSkillCountAggregateOutputType | null
    _avg: StudentSkillAvgAggregateOutputType | null
    _sum: StudentSkillSumAggregateOutputType | null
    _min: StudentSkillMinAggregateOutputType | null
    _max: StudentSkillMaxAggregateOutputType | null
  }

  type GetStudentSkillGroupByPayload<T extends StudentSkillGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentSkillGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentSkillGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentSkillGroupByOutputType[P]>
            : GetScalarType<T[P], StudentSkillGroupByOutputType[P]>
        }
      >
    >


  export type StudentSkillSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    skillId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    skill?: boolean | SkillDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentSkill"]>

  export type StudentSkillSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    skillId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    skill?: boolean | SkillDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentSkill"]>

  export type StudentSkillSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    skillId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    skill?: boolean | SkillDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentSkill"]>

  export type StudentSkillSelectScalar = {
    userId?: boolean
    skillId?: boolean
  }

  export type StudentSkillOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "skillId", ExtArgs["result"]["studentSkill"]>
  export type StudentSkillInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    skill?: boolean | SkillDefaultArgs<ExtArgs>
  }
  export type StudentSkillIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    skill?: boolean | SkillDefaultArgs<ExtArgs>
  }
  export type StudentSkillIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    skill?: boolean | SkillDefaultArgs<ExtArgs>
  }

  export type $StudentSkillPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StudentSkill"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      skill: Prisma.$SkillPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: number
      skillId: number
    }, ExtArgs["result"]["studentSkill"]>
    composites: {}
  }

  type StudentSkillGetPayload<S extends boolean | null | undefined | StudentSkillDefaultArgs> = $Result.GetResult<Prisma.$StudentSkillPayload, S>

  type StudentSkillCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StudentSkillFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StudentSkillCountAggregateInputType | true
    }

  export interface StudentSkillDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StudentSkill'], meta: { name: 'StudentSkill' } }
    /**
     * Find zero or one StudentSkill that matches the filter.
     * @param {StudentSkillFindUniqueArgs} args - Arguments to find a StudentSkill
     * @example
     * // Get one StudentSkill
     * const studentSkill = await prisma.studentSkill.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentSkillFindUniqueArgs>(args: SelectSubset<T, StudentSkillFindUniqueArgs<ExtArgs>>): Prisma__StudentSkillClient<$Result.GetResult<Prisma.$StudentSkillPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StudentSkill that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StudentSkillFindUniqueOrThrowArgs} args - Arguments to find a StudentSkill
     * @example
     * // Get one StudentSkill
     * const studentSkill = await prisma.studentSkill.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentSkillFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentSkillFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentSkillClient<$Result.GetResult<Prisma.$StudentSkillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StudentSkill that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentSkillFindFirstArgs} args - Arguments to find a StudentSkill
     * @example
     * // Get one StudentSkill
     * const studentSkill = await prisma.studentSkill.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentSkillFindFirstArgs>(args?: SelectSubset<T, StudentSkillFindFirstArgs<ExtArgs>>): Prisma__StudentSkillClient<$Result.GetResult<Prisma.$StudentSkillPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StudentSkill that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentSkillFindFirstOrThrowArgs} args - Arguments to find a StudentSkill
     * @example
     * // Get one StudentSkill
     * const studentSkill = await prisma.studentSkill.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentSkillFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentSkillFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentSkillClient<$Result.GetResult<Prisma.$StudentSkillPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StudentSkills that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentSkillFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StudentSkills
     * const studentSkills = await prisma.studentSkill.findMany()
     * 
     * // Get first 10 StudentSkills
     * const studentSkills = await prisma.studentSkill.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const studentSkillWithUserIdOnly = await prisma.studentSkill.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends StudentSkillFindManyArgs>(args?: SelectSubset<T, StudentSkillFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentSkillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StudentSkill.
     * @param {StudentSkillCreateArgs} args - Arguments to create a StudentSkill.
     * @example
     * // Create one StudentSkill
     * const StudentSkill = await prisma.studentSkill.create({
     *   data: {
     *     // ... data to create a StudentSkill
     *   }
     * })
     * 
     */
    create<T extends StudentSkillCreateArgs>(args: SelectSubset<T, StudentSkillCreateArgs<ExtArgs>>): Prisma__StudentSkillClient<$Result.GetResult<Prisma.$StudentSkillPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StudentSkills.
     * @param {StudentSkillCreateManyArgs} args - Arguments to create many StudentSkills.
     * @example
     * // Create many StudentSkills
     * const studentSkill = await prisma.studentSkill.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentSkillCreateManyArgs>(args?: SelectSubset<T, StudentSkillCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StudentSkills and returns the data saved in the database.
     * @param {StudentSkillCreateManyAndReturnArgs} args - Arguments to create many StudentSkills.
     * @example
     * // Create many StudentSkills
     * const studentSkill = await prisma.studentSkill.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StudentSkills and only return the `userId`
     * const studentSkillWithUserIdOnly = await prisma.studentSkill.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StudentSkillCreateManyAndReturnArgs>(args?: SelectSubset<T, StudentSkillCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentSkillPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StudentSkill.
     * @param {StudentSkillDeleteArgs} args - Arguments to delete one StudentSkill.
     * @example
     * // Delete one StudentSkill
     * const StudentSkill = await prisma.studentSkill.delete({
     *   where: {
     *     // ... filter to delete one StudentSkill
     *   }
     * })
     * 
     */
    delete<T extends StudentSkillDeleteArgs>(args: SelectSubset<T, StudentSkillDeleteArgs<ExtArgs>>): Prisma__StudentSkillClient<$Result.GetResult<Prisma.$StudentSkillPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StudentSkill.
     * @param {StudentSkillUpdateArgs} args - Arguments to update one StudentSkill.
     * @example
     * // Update one StudentSkill
     * const studentSkill = await prisma.studentSkill.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentSkillUpdateArgs>(args: SelectSubset<T, StudentSkillUpdateArgs<ExtArgs>>): Prisma__StudentSkillClient<$Result.GetResult<Prisma.$StudentSkillPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StudentSkills.
     * @param {StudentSkillDeleteManyArgs} args - Arguments to filter StudentSkills to delete.
     * @example
     * // Delete a few StudentSkills
     * const { count } = await prisma.studentSkill.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentSkillDeleteManyArgs>(args?: SelectSubset<T, StudentSkillDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StudentSkills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentSkillUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StudentSkills
     * const studentSkill = await prisma.studentSkill.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentSkillUpdateManyArgs>(args: SelectSubset<T, StudentSkillUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StudentSkills and returns the data updated in the database.
     * @param {StudentSkillUpdateManyAndReturnArgs} args - Arguments to update many StudentSkills.
     * @example
     * // Update many StudentSkills
     * const studentSkill = await prisma.studentSkill.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StudentSkills and only return the `userId`
     * const studentSkillWithUserIdOnly = await prisma.studentSkill.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StudentSkillUpdateManyAndReturnArgs>(args: SelectSubset<T, StudentSkillUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentSkillPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StudentSkill.
     * @param {StudentSkillUpsertArgs} args - Arguments to update or create a StudentSkill.
     * @example
     * // Update or create a StudentSkill
     * const studentSkill = await prisma.studentSkill.upsert({
     *   create: {
     *     // ... data to create a StudentSkill
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StudentSkill we want to update
     *   }
     * })
     */
    upsert<T extends StudentSkillUpsertArgs>(args: SelectSubset<T, StudentSkillUpsertArgs<ExtArgs>>): Prisma__StudentSkillClient<$Result.GetResult<Prisma.$StudentSkillPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StudentSkills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentSkillCountArgs} args - Arguments to filter StudentSkills to count.
     * @example
     * // Count the number of StudentSkills
     * const count = await prisma.studentSkill.count({
     *   where: {
     *     // ... the filter for the StudentSkills we want to count
     *   }
     * })
    **/
    count<T extends StudentSkillCountArgs>(
      args?: Subset<T, StudentSkillCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentSkillCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StudentSkill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentSkillAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StudentSkillAggregateArgs>(args: Subset<T, StudentSkillAggregateArgs>): Prisma.PrismaPromise<GetStudentSkillAggregateType<T>>

    /**
     * Group by StudentSkill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentSkillGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StudentSkillGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentSkillGroupByArgs['orderBy'] }
        : { orderBy?: StudentSkillGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StudentSkillGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentSkillGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StudentSkill model
   */
  readonly fields: StudentSkillFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StudentSkill.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentSkillClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    skill<T extends SkillDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SkillDefaultArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StudentSkill model
   */
  interface StudentSkillFieldRefs {
    readonly userId: FieldRef<"StudentSkill", 'Int'>
    readonly skillId: FieldRef<"StudentSkill", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * StudentSkill findUnique
   */
  export type StudentSkillFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentSkill
     */
    select?: StudentSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentSkill
     */
    omit?: StudentSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentSkillInclude<ExtArgs> | null
    /**
     * Filter, which StudentSkill to fetch.
     */
    where: StudentSkillWhereUniqueInput
  }

  /**
   * StudentSkill findUniqueOrThrow
   */
  export type StudentSkillFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentSkill
     */
    select?: StudentSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentSkill
     */
    omit?: StudentSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentSkillInclude<ExtArgs> | null
    /**
     * Filter, which StudentSkill to fetch.
     */
    where: StudentSkillWhereUniqueInput
  }

  /**
   * StudentSkill findFirst
   */
  export type StudentSkillFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentSkill
     */
    select?: StudentSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentSkill
     */
    omit?: StudentSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentSkillInclude<ExtArgs> | null
    /**
     * Filter, which StudentSkill to fetch.
     */
    where?: StudentSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentSkills to fetch.
     */
    orderBy?: StudentSkillOrderByWithRelationInput | StudentSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StudentSkills.
     */
    cursor?: StudentSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudentSkills.
     */
    distinct?: StudentSkillScalarFieldEnum | StudentSkillScalarFieldEnum[]
  }

  /**
   * StudentSkill findFirstOrThrow
   */
  export type StudentSkillFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentSkill
     */
    select?: StudentSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentSkill
     */
    omit?: StudentSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentSkillInclude<ExtArgs> | null
    /**
     * Filter, which StudentSkill to fetch.
     */
    where?: StudentSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentSkills to fetch.
     */
    orderBy?: StudentSkillOrderByWithRelationInput | StudentSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StudentSkills.
     */
    cursor?: StudentSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudentSkills.
     */
    distinct?: StudentSkillScalarFieldEnum | StudentSkillScalarFieldEnum[]
  }

  /**
   * StudentSkill findMany
   */
  export type StudentSkillFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentSkill
     */
    select?: StudentSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentSkill
     */
    omit?: StudentSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentSkillInclude<ExtArgs> | null
    /**
     * Filter, which StudentSkills to fetch.
     */
    where?: StudentSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentSkills to fetch.
     */
    orderBy?: StudentSkillOrderByWithRelationInput | StudentSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StudentSkills.
     */
    cursor?: StudentSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudentSkills.
     */
    distinct?: StudentSkillScalarFieldEnum | StudentSkillScalarFieldEnum[]
  }

  /**
   * StudentSkill create
   */
  export type StudentSkillCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentSkill
     */
    select?: StudentSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentSkill
     */
    omit?: StudentSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentSkillInclude<ExtArgs> | null
    /**
     * The data needed to create a StudentSkill.
     */
    data: XOR<StudentSkillCreateInput, StudentSkillUncheckedCreateInput>
  }

  /**
   * StudentSkill createMany
   */
  export type StudentSkillCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StudentSkills.
     */
    data: StudentSkillCreateManyInput | StudentSkillCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StudentSkill createManyAndReturn
   */
  export type StudentSkillCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentSkill
     */
    select?: StudentSkillSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StudentSkill
     */
    omit?: StudentSkillOmit<ExtArgs> | null
    /**
     * The data used to create many StudentSkills.
     */
    data: StudentSkillCreateManyInput | StudentSkillCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentSkillIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StudentSkill update
   */
  export type StudentSkillUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentSkill
     */
    select?: StudentSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentSkill
     */
    omit?: StudentSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentSkillInclude<ExtArgs> | null
    /**
     * The data needed to update a StudentSkill.
     */
    data: XOR<StudentSkillUpdateInput, StudentSkillUncheckedUpdateInput>
    /**
     * Choose, which StudentSkill to update.
     */
    where: StudentSkillWhereUniqueInput
  }

  /**
   * StudentSkill updateMany
   */
  export type StudentSkillUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StudentSkills.
     */
    data: XOR<StudentSkillUpdateManyMutationInput, StudentSkillUncheckedUpdateManyInput>
    /**
     * Filter which StudentSkills to update
     */
    where?: StudentSkillWhereInput
    /**
     * Limit how many StudentSkills to update.
     */
    limit?: number
  }

  /**
   * StudentSkill updateManyAndReturn
   */
  export type StudentSkillUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentSkill
     */
    select?: StudentSkillSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StudentSkill
     */
    omit?: StudentSkillOmit<ExtArgs> | null
    /**
     * The data used to update StudentSkills.
     */
    data: XOR<StudentSkillUpdateManyMutationInput, StudentSkillUncheckedUpdateManyInput>
    /**
     * Filter which StudentSkills to update
     */
    where?: StudentSkillWhereInput
    /**
     * Limit how many StudentSkills to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentSkillIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StudentSkill upsert
   */
  export type StudentSkillUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentSkill
     */
    select?: StudentSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentSkill
     */
    omit?: StudentSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentSkillInclude<ExtArgs> | null
    /**
     * The filter to search for the StudentSkill to update in case it exists.
     */
    where: StudentSkillWhereUniqueInput
    /**
     * In case the StudentSkill found by the `where` argument doesn't exist, create a new StudentSkill with this data.
     */
    create: XOR<StudentSkillCreateInput, StudentSkillUncheckedCreateInput>
    /**
     * In case the StudentSkill was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentSkillUpdateInput, StudentSkillUncheckedUpdateInput>
  }

  /**
   * StudentSkill delete
   */
  export type StudentSkillDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentSkill
     */
    select?: StudentSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentSkill
     */
    omit?: StudentSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentSkillInclude<ExtArgs> | null
    /**
     * Filter which StudentSkill to delete.
     */
    where: StudentSkillWhereUniqueInput
  }

  /**
   * StudentSkill deleteMany
   */
  export type StudentSkillDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StudentSkills to delete
     */
    where?: StudentSkillWhereInput
    /**
     * Limit how many StudentSkills to delete.
     */
    limit?: number
  }

  /**
   * StudentSkill without action
   */
  export type StudentSkillDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentSkill
     */
    select?: StudentSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentSkill
     */
    omit?: StudentSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentSkillInclude<ExtArgs> | null
  }


  /**
   * Model PlacementSkill
   */

  export type AggregatePlacementSkill = {
    _count: PlacementSkillCountAggregateOutputType | null
    _avg: PlacementSkillAvgAggregateOutputType | null
    _sum: PlacementSkillSumAggregateOutputType | null
    _min: PlacementSkillMinAggregateOutputType | null
    _max: PlacementSkillMaxAggregateOutputType | null
  }

  export type PlacementSkillAvgAggregateOutputType = {
    placementId: number | null
    skillId: number | null
  }

  export type PlacementSkillSumAggregateOutputType = {
    placementId: number | null
    skillId: number | null
  }

  export type PlacementSkillMinAggregateOutputType = {
    placementId: number | null
    skillId: number | null
  }

  export type PlacementSkillMaxAggregateOutputType = {
    placementId: number | null
    skillId: number | null
  }

  export type PlacementSkillCountAggregateOutputType = {
    placementId: number
    skillId: number
    _all: number
  }


  export type PlacementSkillAvgAggregateInputType = {
    placementId?: true
    skillId?: true
  }

  export type PlacementSkillSumAggregateInputType = {
    placementId?: true
    skillId?: true
  }

  export type PlacementSkillMinAggregateInputType = {
    placementId?: true
    skillId?: true
  }

  export type PlacementSkillMaxAggregateInputType = {
    placementId?: true
    skillId?: true
  }

  export type PlacementSkillCountAggregateInputType = {
    placementId?: true
    skillId?: true
    _all?: true
  }

  export type PlacementSkillAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlacementSkill to aggregate.
     */
    where?: PlacementSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlacementSkills to fetch.
     */
    orderBy?: PlacementSkillOrderByWithRelationInput | PlacementSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlacementSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlacementSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlacementSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PlacementSkills
    **/
    _count?: true | PlacementSkillCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlacementSkillAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlacementSkillSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlacementSkillMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlacementSkillMaxAggregateInputType
  }

  export type GetPlacementSkillAggregateType<T extends PlacementSkillAggregateArgs> = {
        [P in keyof T & keyof AggregatePlacementSkill]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlacementSkill[P]>
      : GetScalarType<T[P], AggregatePlacementSkill[P]>
  }




  export type PlacementSkillGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlacementSkillWhereInput
    orderBy?: PlacementSkillOrderByWithAggregationInput | PlacementSkillOrderByWithAggregationInput[]
    by: PlacementSkillScalarFieldEnum[] | PlacementSkillScalarFieldEnum
    having?: PlacementSkillScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlacementSkillCountAggregateInputType | true
    _avg?: PlacementSkillAvgAggregateInputType
    _sum?: PlacementSkillSumAggregateInputType
    _min?: PlacementSkillMinAggregateInputType
    _max?: PlacementSkillMaxAggregateInputType
  }

  export type PlacementSkillGroupByOutputType = {
    placementId: number
    skillId: number
    _count: PlacementSkillCountAggregateOutputType | null
    _avg: PlacementSkillAvgAggregateOutputType | null
    _sum: PlacementSkillSumAggregateOutputType | null
    _min: PlacementSkillMinAggregateOutputType | null
    _max: PlacementSkillMaxAggregateOutputType | null
  }

  type GetPlacementSkillGroupByPayload<T extends PlacementSkillGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlacementSkillGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlacementSkillGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlacementSkillGroupByOutputType[P]>
            : GetScalarType<T[P], PlacementSkillGroupByOutputType[P]>
        }
      >
    >


  export type PlacementSkillSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    placementId?: boolean
    skillId?: boolean
    placement?: boolean | PlacementDefaultArgs<ExtArgs>
    skill?: boolean | SkillDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["placementSkill"]>

  export type PlacementSkillSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    placementId?: boolean
    skillId?: boolean
    placement?: boolean | PlacementDefaultArgs<ExtArgs>
    skill?: boolean | SkillDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["placementSkill"]>

  export type PlacementSkillSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    placementId?: boolean
    skillId?: boolean
    placement?: boolean | PlacementDefaultArgs<ExtArgs>
    skill?: boolean | SkillDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["placementSkill"]>

  export type PlacementSkillSelectScalar = {
    placementId?: boolean
    skillId?: boolean
  }

  export type PlacementSkillOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"placementId" | "skillId", ExtArgs["result"]["placementSkill"]>
  export type PlacementSkillInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    placement?: boolean | PlacementDefaultArgs<ExtArgs>
    skill?: boolean | SkillDefaultArgs<ExtArgs>
  }
  export type PlacementSkillIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    placement?: boolean | PlacementDefaultArgs<ExtArgs>
    skill?: boolean | SkillDefaultArgs<ExtArgs>
  }
  export type PlacementSkillIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    placement?: boolean | PlacementDefaultArgs<ExtArgs>
    skill?: boolean | SkillDefaultArgs<ExtArgs>
  }

  export type $PlacementSkillPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PlacementSkill"
    objects: {
      placement: Prisma.$PlacementPayload<ExtArgs>
      skill: Prisma.$SkillPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      placementId: number
      skillId: number
    }, ExtArgs["result"]["placementSkill"]>
    composites: {}
  }

  type PlacementSkillGetPayload<S extends boolean | null | undefined | PlacementSkillDefaultArgs> = $Result.GetResult<Prisma.$PlacementSkillPayload, S>

  type PlacementSkillCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlacementSkillFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlacementSkillCountAggregateInputType | true
    }

  export interface PlacementSkillDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PlacementSkill'], meta: { name: 'PlacementSkill' } }
    /**
     * Find zero or one PlacementSkill that matches the filter.
     * @param {PlacementSkillFindUniqueArgs} args - Arguments to find a PlacementSkill
     * @example
     * // Get one PlacementSkill
     * const placementSkill = await prisma.placementSkill.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlacementSkillFindUniqueArgs>(args: SelectSubset<T, PlacementSkillFindUniqueArgs<ExtArgs>>): Prisma__PlacementSkillClient<$Result.GetResult<Prisma.$PlacementSkillPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PlacementSkill that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlacementSkillFindUniqueOrThrowArgs} args - Arguments to find a PlacementSkill
     * @example
     * // Get one PlacementSkill
     * const placementSkill = await prisma.placementSkill.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlacementSkillFindUniqueOrThrowArgs>(args: SelectSubset<T, PlacementSkillFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlacementSkillClient<$Result.GetResult<Prisma.$PlacementSkillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlacementSkill that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlacementSkillFindFirstArgs} args - Arguments to find a PlacementSkill
     * @example
     * // Get one PlacementSkill
     * const placementSkill = await prisma.placementSkill.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlacementSkillFindFirstArgs>(args?: SelectSubset<T, PlacementSkillFindFirstArgs<ExtArgs>>): Prisma__PlacementSkillClient<$Result.GetResult<Prisma.$PlacementSkillPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlacementSkill that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlacementSkillFindFirstOrThrowArgs} args - Arguments to find a PlacementSkill
     * @example
     * // Get one PlacementSkill
     * const placementSkill = await prisma.placementSkill.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlacementSkillFindFirstOrThrowArgs>(args?: SelectSubset<T, PlacementSkillFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlacementSkillClient<$Result.GetResult<Prisma.$PlacementSkillPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PlacementSkills that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlacementSkillFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlacementSkills
     * const placementSkills = await prisma.placementSkill.findMany()
     * 
     * // Get first 10 PlacementSkills
     * const placementSkills = await prisma.placementSkill.findMany({ take: 10 })
     * 
     * // Only select the `placementId`
     * const placementSkillWithPlacementIdOnly = await prisma.placementSkill.findMany({ select: { placementId: true } })
     * 
     */
    findMany<T extends PlacementSkillFindManyArgs>(args?: SelectSubset<T, PlacementSkillFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlacementSkillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PlacementSkill.
     * @param {PlacementSkillCreateArgs} args - Arguments to create a PlacementSkill.
     * @example
     * // Create one PlacementSkill
     * const PlacementSkill = await prisma.placementSkill.create({
     *   data: {
     *     // ... data to create a PlacementSkill
     *   }
     * })
     * 
     */
    create<T extends PlacementSkillCreateArgs>(args: SelectSubset<T, PlacementSkillCreateArgs<ExtArgs>>): Prisma__PlacementSkillClient<$Result.GetResult<Prisma.$PlacementSkillPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PlacementSkills.
     * @param {PlacementSkillCreateManyArgs} args - Arguments to create many PlacementSkills.
     * @example
     * // Create many PlacementSkills
     * const placementSkill = await prisma.placementSkill.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlacementSkillCreateManyArgs>(args?: SelectSubset<T, PlacementSkillCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PlacementSkills and returns the data saved in the database.
     * @param {PlacementSkillCreateManyAndReturnArgs} args - Arguments to create many PlacementSkills.
     * @example
     * // Create many PlacementSkills
     * const placementSkill = await prisma.placementSkill.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PlacementSkills and only return the `placementId`
     * const placementSkillWithPlacementIdOnly = await prisma.placementSkill.createManyAndReturn({
     *   select: { placementId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlacementSkillCreateManyAndReturnArgs>(args?: SelectSubset<T, PlacementSkillCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlacementSkillPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PlacementSkill.
     * @param {PlacementSkillDeleteArgs} args - Arguments to delete one PlacementSkill.
     * @example
     * // Delete one PlacementSkill
     * const PlacementSkill = await prisma.placementSkill.delete({
     *   where: {
     *     // ... filter to delete one PlacementSkill
     *   }
     * })
     * 
     */
    delete<T extends PlacementSkillDeleteArgs>(args: SelectSubset<T, PlacementSkillDeleteArgs<ExtArgs>>): Prisma__PlacementSkillClient<$Result.GetResult<Prisma.$PlacementSkillPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PlacementSkill.
     * @param {PlacementSkillUpdateArgs} args - Arguments to update one PlacementSkill.
     * @example
     * // Update one PlacementSkill
     * const placementSkill = await prisma.placementSkill.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlacementSkillUpdateArgs>(args: SelectSubset<T, PlacementSkillUpdateArgs<ExtArgs>>): Prisma__PlacementSkillClient<$Result.GetResult<Prisma.$PlacementSkillPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PlacementSkills.
     * @param {PlacementSkillDeleteManyArgs} args - Arguments to filter PlacementSkills to delete.
     * @example
     * // Delete a few PlacementSkills
     * const { count } = await prisma.placementSkill.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlacementSkillDeleteManyArgs>(args?: SelectSubset<T, PlacementSkillDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlacementSkills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlacementSkillUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlacementSkills
     * const placementSkill = await prisma.placementSkill.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlacementSkillUpdateManyArgs>(args: SelectSubset<T, PlacementSkillUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlacementSkills and returns the data updated in the database.
     * @param {PlacementSkillUpdateManyAndReturnArgs} args - Arguments to update many PlacementSkills.
     * @example
     * // Update many PlacementSkills
     * const placementSkill = await prisma.placementSkill.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PlacementSkills and only return the `placementId`
     * const placementSkillWithPlacementIdOnly = await prisma.placementSkill.updateManyAndReturn({
     *   select: { placementId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlacementSkillUpdateManyAndReturnArgs>(args: SelectSubset<T, PlacementSkillUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlacementSkillPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PlacementSkill.
     * @param {PlacementSkillUpsertArgs} args - Arguments to update or create a PlacementSkill.
     * @example
     * // Update or create a PlacementSkill
     * const placementSkill = await prisma.placementSkill.upsert({
     *   create: {
     *     // ... data to create a PlacementSkill
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlacementSkill we want to update
     *   }
     * })
     */
    upsert<T extends PlacementSkillUpsertArgs>(args: SelectSubset<T, PlacementSkillUpsertArgs<ExtArgs>>): Prisma__PlacementSkillClient<$Result.GetResult<Prisma.$PlacementSkillPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PlacementSkills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlacementSkillCountArgs} args - Arguments to filter PlacementSkills to count.
     * @example
     * // Count the number of PlacementSkills
     * const count = await prisma.placementSkill.count({
     *   where: {
     *     // ... the filter for the PlacementSkills we want to count
     *   }
     * })
    **/
    count<T extends PlacementSkillCountArgs>(
      args?: Subset<T, PlacementSkillCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlacementSkillCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PlacementSkill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlacementSkillAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlacementSkillAggregateArgs>(args: Subset<T, PlacementSkillAggregateArgs>): Prisma.PrismaPromise<GetPlacementSkillAggregateType<T>>

    /**
     * Group by PlacementSkill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlacementSkillGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlacementSkillGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlacementSkillGroupByArgs['orderBy'] }
        : { orderBy?: PlacementSkillGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlacementSkillGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlacementSkillGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PlacementSkill model
   */
  readonly fields: PlacementSkillFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PlacementSkill.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlacementSkillClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    placement<T extends PlacementDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlacementDefaultArgs<ExtArgs>>): Prisma__PlacementClient<$Result.GetResult<Prisma.$PlacementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    skill<T extends SkillDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SkillDefaultArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PlacementSkill model
   */
  interface PlacementSkillFieldRefs {
    readonly placementId: FieldRef<"PlacementSkill", 'Int'>
    readonly skillId: FieldRef<"PlacementSkill", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * PlacementSkill findUnique
   */
  export type PlacementSkillFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementSkill
     */
    select?: PlacementSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementSkill
     */
    omit?: PlacementSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementSkillInclude<ExtArgs> | null
    /**
     * Filter, which PlacementSkill to fetch.
     */
    where: PlacementSkillWhereUniqueInput
  }

  /**
   * PlacementSkill findUniqueOrThrow
   */
  export type PlacementSkillFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementSkill
     */
    select?: PlacementSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementSkill
     */
    omit?: PlacementSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementSkillInclude<ExtArgs> | null
    /**
     * Filter, which PlacementSkill to fetch.
     */
    where: PlacementSkillWhereUniqueInput
  }

  /**
   * PlacementSkill findFirst
   */
  export type PlacementSkillFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementSkill
     */
    select?: PlacementSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementSkill
     */
    omit?: PlacementSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementSkillInclude<ExtArgs> | null
    /**
     * Filter, which PlacementSkill to fetch.
     */
    where?: PlacementSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlacementSkills to fetch.
     */
    orderBy?: PlacementSkillOrderByWithRelationInput | PlacementSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlacementSkills.
     */
    cursor?: PlacementSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlacementSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlacementSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlacementSkills.
     */
    distinct?: PlacementSkillScalarFieldEnum | PlacementSkillScalarFieldEnum[]
  }

  /**
   * PlacementSkill findFirstOrThrow
   */
  export type PlacementSkillFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementSkill
     */
    select?: PlacementSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementSkill
     */
    omit?: PlacementSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementSkillInclude<ExtArgs> | null
    /**
     * Filter, which PlacementSkill to fetch.
     */
    where?: PlacementSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlacementSkills to fetch.
     */
    orderBy?: PlacementSkillOrderByWithRelationInput | PlacementSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlacementSkills.
     */
    cursor?: PlacementSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlacementSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlacementSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlacementSkills.
     */
    distinct?: PlacementSkillScalarFieldEnum | PlacementSkillScalarFieldEnum[]
  }

  /**
   * PlacementSkill findMany
   */
  export type PlacementSkillFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementSkill
     */
    select?: PlacementSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementSkill
     */
    omit?: PlacementSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementSkillInclude<ExtArgs> | null
    /**
     * Filter, which PlacementSkills to fetch.
     */
    where?: PlacementSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlacementSkills to fetch.
     */
    orderBy?: PlacementSkillOrderByWithRelationInput | PlacementSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PlacementSkills.
     */
    cursor?: PlacementSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlacementSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlacementSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlacementSkills.
     */
    distinct?: PlacementSkillScalarFieldEnum | PlacementSkillScalarFieldEnum[]
  }

  /**
   * PlacementSkill create
   */
  export type PlacementSkillCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementSkill
     */
    select?: PlacementSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementSkill
     */
    omit?: PlacementSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementSkillInclude<ExtArgs> | null
    /**
     * The data needed to create a PlacementSkill.
     */
    data: XOR<PlacementSkillCreateInput, PlacementSkillUncheckedCreateInput>
  }

  /**
   * PlacementSkill createMany
   */
  export type PlacementSkillCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PlacementSkills.
     */
    data: PlacementSkillCreateManyInput | PlacementSkillCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PlacementSkill createManyAndReturn
   */
  export type PlacementSkillCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementSkill
     */
    select?: PlacementSkillSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementSkill
     */
    omit?: PlacementSkillOmit<ExtArgs> | null
    /**
     * The data used to create many PlacementSkills.
     */
    data: PlacementSkillCreateManyInput | PlacementSkillCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementSkillIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlacementSkill update
   */
  export type PlacementSkillUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementSkill
     */
    select?: PlacementSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementSkill
     */
    omit?: PlacementSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementSkillInclude<ExtArgs> | null
    /**
     * The data needed to update a PlacementSkill.
     */
    data: XOR<PlacementSkillUpdateInput, PlacementSkillUncheckedUpdateInput>
    /**
     * Choose, which PlacementSkill to update.
     */
    where: PlacementSkillWhereUniqueInput
  }

  /**
   * PlacementSkill updateMany
   */
  export type PlacementSkillUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PlacementSkills.
     */
    data: XOR<PlacementSkillUpdateManyMutationInput, PlacementSkillUncheckedUpdateManyInput>
    /**
     * Filter which PlacementSkills to update
     */
    where?: PlacementSkillWhereInput
    /**
     * Limit how many PlacementSkills to update.
     */
    limit?: number
  }

  /**
   * PlacementSkill updateManyAndReturn
   */
  export type PlacementSkillUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementSkill
     */
    select?: PlacementSkillSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementSkill
     */
    omit?: PlacementSkillOmit<ExtArgs> | null
    /**
     * The data used to update PlacementSkills.
     */
    data: XOR<PlacementSkillUpdateManyMutationInput, PlacementSkillUncheckedUpdateManyInput>
    /**
     * Filter which PlacementSkills to update
     */
    where?: PlacementSkillWhereInput
    /**
     * Limit how many PlacementSkills to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementSkillIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlacementSkill upsert
   */
  export type PlacementSkillUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementSkill
     */
    select?: PlacementSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementSkill
     */
    omit?: PlacementSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementSkillInclude<ExtArgs> | null
    /**
     * The filter to search for the PlacementSkill to update in case it exists.
     */
    where: PlacementSkillWhereUniqueInput
    /**
     * In case the PlacementSkill found by the `where` argument doesn't exist, create a new PlacementSkill with this data.
     */
    create: XOR<PlacementSkillCreateInput, PlacementSkillUncheckedCreateInput>
    /**
     * In case the PlacementSkill was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlacementSkillUpdateInput, PlacementSkillUncheckedUpdateInput>
  }

  /**
   * PlacementSkill delete
   */
  export type PlacementSkillDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementSkill
     */
    select?: PlacementSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementSkill
     */
    omit?: PlacementSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementSkillInclude<ExtArgs> | null
    /**
     * Filter which PlacementSkill to delete.
     */
    where: PlacementSkillWhereUniqueInput
  }

  /**
   * PlacementSkill deleteMany
   */
  export type PlacementSkillDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlacementSkills to delete
     */
    where?: PlacementSkillWhereInput
    /**
     * Limit how many PlacementSkills to delete.
     */
    limit?: number
  }

  /**
   * PlacementSkill without action
   */
  export type PlacementSkillDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementSkill
     */
    select?: PlacementSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementSkill
     */
    omit?: PlacementSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementSkillInclude<ExtArgs> | null
  }


  /**
   * Model PlacementBranch
   */

  export type AggregatePlacementBranch = {
    _count: PlacementBranchCountAggregateOutputType | null
    _avg: PlacementBranchAvgAggregateOutputType | null
    _sum: PlacementBranchSumAggregateOutputType | null
    _min: PlacementBranchMinAggregateOutputType | null
    _max: PlacementBranchMaxAggregateOutputType | null
  }

  export type PlacementBranchAvgAggregateOutputType = {
    placementId: number | null
    branchId: number | null
  }

  export type PlacementBranchSumAggregateOutputType = {
    placementId: number | null
    branchId: number | null
  }

  export type PlacementBranchMinAggregateOutputType = {
    placementId: number | null
    branchId: number | null
  }

  export type PlacementBranchMaxAggregateOutputType = {
    placementId: number | null
    branchId: number | null
  }

  export type PlacementBranchCountAggregateOutputType = {
    placementId: number
    branchId: number
    _all: number
  }


  export type PlacementBranchAvgAggregateInputType = {
    placementId?: true
    branchId?: true
  }

  export type PlacementBranchSumAggregateInputType = {
    placementId?: true
    branchId?: true
  }

  export type PlacementBranchMinAggregateInputType = {
    placementId?: true
    branchId?: true
  }

  export type PlacementBranchMaxAggregateInputType = {
    placementId?: true
    branchId?: true
  }

  export type PlacementBranchCountAggregateInputType = {
    placementId?: true
    branchId?: true
    _all?: true
  }

  export type PlacementBranchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlacementBranch to aggregate.
     */
    where?: PlacementBranchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlacementBranches to fetch.
     */
    orderBy?: PlacementBranchOrderByWithRelationInput | PlacementBranchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlacementBranchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlacementBranches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlacementBranches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PlacementBranches
    **/
    _count?: true | PlacementBranchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlacementBranchAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlacementBranchSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlacementBranchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlacementBranchMaxAggregateInputType
  }

  export type GetPlacementBranchAggregateType<T extends PlacementBranchAggregateArgs> = {
        [P in keyof T & keyof AggregatePlacementBranch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlacementBranch[P]>
      : GetScalarType<T[P], AggregatePlacementBranch[P]>
  }




  export type PlacementBranchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlacementBranchWhereInput
    orderBy?: PlacementBranchOrderByWithAggregationInput | PlacementBranchOrderByWithAggregationInput[]
    by: PlacementBranchScalarFieldEnum[] | PlacementBranchScalarFieldEnum
    having?: PlacementBranchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlacementBranchCountAggregateInputType | true
    _avg?: PlacementBranchAvgAggregateInputType
    _sum?: PlacementBranchSumAggregateInputType
    _min?: PlacementBranchMinAggregateInputType
    _max?: PlacementBranchMaxAggregateInputType
  }

  export type PlacementBranchGroupByOutputType = {
    placementId: number
    branchId: number
    _count: PlacementBranchCountAggregateOutputType | null
    _avg: PlacementBranchAvgAggregateOutputType | null
    _sum: PlacementBranchSumAggregateOutputType | null
    _min: PlacementBranchMinAggregateOutputType | null
    _max: PlacementBranchMaxAggregateOutputType | null
  }

  type GetPlacementBranchGroupByPayload<T extends PlacementBranchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlacementBranchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlacementBranchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlacementBranchGroupByOutputType[P]>
            : GetScalarType<T[P], PlacementBranchGroupByOutputType[P]>
        }
      >
    >


  export type PlacementBranchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    placementId?: boolean
    branchId?: boolean
    placement?: boolean | PlacementDefaultArgs<ExtArgs>
    branch?: boolean | BranchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["placementBranch"]>

  export type PlacementBranchSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    placementId?: boolean
    branchId?: boolean
    placement?: boolean | PlacementDefaultArgs<ExtArgs>
    branch?: boolean | BranchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["placementBranch"]>

  export type PlacementBranchSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    placementId?: boolean
    branchId?: boolean
    placement?: boolean | PlacementDefaultArgs<ExtArgs>
    branch?: boolean | BranchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["placementBranch"]>

  export type PlacementBranchSelectScalar = {
    placementId?: boolean
    branchId?: boolean
  }

  export type PlacementBranchOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"placementId" | "branchId", ExtArgs["result"]["placementBranch"]>
  export type PlacementBranchInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    placement?: boolean | PlacementDefaultArgs<ExtArgs>
    branch?: boolean | BranchDefaultArgs<ExtArgs>
  }
  export type PlacementBranchIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    placement?: boolean | PlacementDefaultArgs<ExtArgs>
    branch?: boolean | BranchDefaultArgs<ExtArgs>
  }
  export type PlacementBranchIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    placement?: boolean | PlacementDefaultArgs<ExtArgs>
    branch?: boolean | BranchDefaultArgs<ExtArgs>
  }

  export type $PlacementBranchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PlacementBranch"
    objects: {
      placement: Prisma.$PlacementPayload<ExtArgs>
      branch: Prisma.$BranchPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      placementId: number
      branchId: number
    }, ExtArgs["result"]["placementBranch"]>
    composites: {}
  }

  type PlacementBranchGetPayload<S extends boolean | null | undefined | PlacementBranchDefaultArgs> = $Result.GetResult<Prisma.$PlacementBranchPayload, S>

  type PlacementBranchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlacementBranchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlacementBranchCountAggregateInputType | true
    }

  export interface PlacementBranchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PlacementBranch'], meta: { name: 'PlacementBranch' } }
    /**
     * Find zero or one PlacementBranch that matches the filter.
     * @param {PlacementBranchFindUniqueArgs} args - Arguments to find a PlacementBranch
     * @example
     * // Get one PlacementBranch
     * const placementBranch = await prisma.placementBranch.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlacementBranchFindUniqueArgs>(args: SelectSubset<T, PlacementBranchFindUniqueArgs<ExtArgs>>): Prisma__PlacementBranchClient<$Result.GetResult<Prisma.$PlacementBranchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PlacementBranch that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlacementBranchFindUniqueOrThrowArgs} args - Arguments to find a PlacementBranch
     * @example
     * // Get one PlacementBranch
     * const placementBranch = await prisma.placementBranch.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlacementBranchFindUniqueOrThrowArgs>(args: SelectSubset<T, PlacementBranchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlacementBranchClient<$Result.GetResult<Prisma.$PlacementBranchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlacementBranch that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlacementBranchFindFirstArgs} args - Arguments to find a PlacementBranch
     * @example
     * // Get one PlacementBranch
     * const placementBranch = await prisma.placementBranch.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlacementBranchFindFirstArgs>(args?: SelectSubset<T, PlacementBranchFindFirstArgs<ExtArgs>>): Prisma__PlacementBranchClient<$Result.GetResult<Prisma.$PlacementBranchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlacementBranch that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlacementBranchFindFirstOrThrowArgs} args - Arguments to find a PlacementBranch
     * @example
     * // Get one PlacementBranch
     * const placementBranch = await prisma.placementBranch.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlacementBranchFindFirstOrThrowArgs>(args?: SelectSubset<T, PlacementBranchFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlacementBranchClient<$Result.GetResult<Prisma.$PlacementBranchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PlacementBranches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlacementBranchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlacementBranches
     * const placementBranches = await prisma.placementBranch.findMany()
     * 
     * // Get first 10 PlacementBranches
     * const placementBranches = await prisma.placementBranch.findMany({ take: 10 })
     * 
     * // Only select the `placementId`
     * const placementBranchWithPlacementIdOnly = await prisma.placementBranch.findMany({ select: { placementId: true } })
     * 
     */
    findMany<T extends PlacementBranchFindManyArgs>(args?: SelectSubset<T, PlacementBranchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlacementBranchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PlacementBranch.
     * @param {PlacementBranchCreateArgs} args - Arguments to create a PlacementBranch.
     * @example
     * // Create one PlacementBranch
     * const PlacementBranch = await prisma.placementBranch.create({
     *   data: {
     *     // ... data to create a PlacementBranch
     *   }
     * })
     * 
     */
    create<T extends PlacementBranchCreateArgs>(args: SelectSubset<T, PlacementBranchCreateArgs<ExtArgs>>): Prisma__PlacementBranchClient<$Result.GetResult<Prisma.$PlacementBranchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PlacementBranches.
     * @param {PlacementBranchCreateManyArgs} args - Arguments to create many PlacementBranches.
     * @example
     * // Create many PlacementBranches
     * const placementBranch = await prisma.placementBranch.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlacementBranchCreateManyArgs>(args?: SelectSubset<T, PlacementBranchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PlacementBranches and returns the data saved in the database.
     * @param {PlacementBranchCreateManyAndReturnArgs} args - Arguments to create many PlacementBranches.
     * @example
     * // Create many PlacementBranches
     * const placementBranch = await prisma.placementBranch.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PlacementBranches and only return the `placementId`
     * const placementBranchWithPlacementIdOnly = await prisma.placementBranch.createManyAndReturn({
     *   select: { placementId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlacementBranchCreateManyAndReturnArgs>(args?: SelectSubset<T, PlacementBranchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlacementBranchPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PlacementBranch.
     * @param {PlacementBranchDeleteArgs} args - Arguments to delete one PlacementBranch.
     * @example
     * // Delete one PlacementBranch
     * const PlacementBranch = await prisma.placementBranch.delete({
     *   where: {
     *     // ... filter to delete one PlacementBranch
     *   }
     * })
     * 
     */
    delete<T extends PlacementBranchDeleteArgs>(args: SelectSubset<T, PlacementBranchDeleteArgs<ExtArgs>>): Prisma__PlacementBranchClient<$Result.GetResult<Prisma.$PlacementBranchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PlacementBranch.
     * @param {PlacementBranchUpdateArgs} args - Arguments to update one PlacementBranch.
     * @example
     * // Update one PlacementBranch
     * const placementBranch = await prisma.placementBranch.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlacementBranchUpdateArgs>(args: SelectSubset<T, PlacementBranchUpdateArgs<ExtArgs>>): Prisma__PlacementBranchClient<$Result.GetResult<Prisma.$PlacementBranchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PlacementBranches.
     * @param {PlacementBranchDeleteManyArgs} args - Arguments to filter PlacementBranches to delete.
     * @example
     * // Delete a few PlacementBranches
     * const { count } = await prisma.placementBranch.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlacementBranchDeleteManyArgs>(args?: SelectSubset<T, PlacementBranchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlacementBranches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlacementBranchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlacementBranches
     * const placementBranch = await prisma.placementBranch.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlacementBranchUpdateManyArgs>(args: SelectSubset<T, PlacementBranchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlacementBranches and returns the data updated in the database.
     * @param {PlacementBranchUpdateManyAndReturnArgs} args - Arguments to update many PlacementBranches.
     * @example
     * // Update many PlacementBranches
     * const placementBranch = await prisma.placementBranch.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PlacementBranches and only return the `placementId`
     * const placementBranchWithPlacementIdOnly = await prisma.placementBranch.updateManyAndReturn({
     *   select: { placementId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlacementBranchUpdateManyAndReturnArgs>(args: SelectSubset<T, PlacementBranchUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlacementBranchPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PlacementBranch.
     * @param {PlacementBranchUpsertArgs} args - Arguments to update or create a PlacementBranch.
     * @example
     * // Update or create a PlacementBranch
     * const placementBranch = await prisma.placementBranch.upsert({
     *   create: {
     *     // ... data to create a PlacementBranch
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlacementBranch we want to update
     *   }
     * })
     */
    upsert<T extends PlacementBranchUpsertArgs>(args: SelectSubset<T, PlacementBranchUpsertArgs<ExtArgs>>): Prisma__PlacementBranchClient<$Result.GetResult<Prisma.$PlacementBranchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PlacementBranches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlacementBranchCountArgs} args - Arguments to filter PlacementBranches to count.
     * @example
     * // Count the number of PlacementBranches
     * const count = await prisma.placementBranch.count({
     *   where: {
     *     // ... the filter for the PlacementBranches we want to count
     *   }
     * })
    **/
    count<T extends PlacementBranchCountArgs>(
      args?: Subset<T, PlacementBranchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlacementBranchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PlacementBranch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlacementBranchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlacementBranchAggregateArgs>(args: Subset<T, PlacementBranchAggregateArgs>): Prisma.PrismaPromise<GetPlacementBranchAggregateType<T>>

    /**
     * Group by PlacementBranch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlacementBranchGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlacementBranchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlacementBranchGroupByArgs['orderBy'] }
        : { orderBy?: PlacementBranchGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlacementBranchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlacementBranchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PlacementBranch model
   */
  readonly fields: PlacementBranchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PlacementBranch.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlacementBranchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    placement<T extends PlacementDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlacementDefaultArgs<ExtArgs>>): Prisma__PlacementClient<$Result.GetResult<Prisma.$PlacementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    branch<T extends BranchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BranchDefaultArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PlacementBranch model
   */
  interface PlacementBranchFieldRefs {
    readonly placementId: FieldRef<"PlacementBranch", 'Int'>
    readonly branchId: FieldRef<"PlacementBranch", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * PlacementBranch findUnique
   */
  export type PlacementBranchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementBranch
     */
    select?: PlacementBranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementBranch
     */
    omit?: PlacementBranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementBranchInclude<ExtArgs> | null
    /**
     * Filter, which PlacementBranch to fetch.
     */
    where: PlacementBranchWhereUniqueInput
  }

  /**
   * PlacementBranch findUniqueOrThrow
   */
  export type PlacementBranchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementBranch
     */
    select?: PlacementBranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementBranch
     */
    omit?: PlacementBranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementBranchInclude<ExtArgs> | null
    /**
     * Filter, which PlacementBranch to fetch.
     */
    where: PlacementBranchWhereUniqueInput
  }

  /**
   * PlacementBranch findFirst
   */
  export type PlacementBranchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementBranch
     */
    select?: PlacementBranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementBranch
     */
    omit?: PlacementBranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementBranchInclude<ExtArgs> | null
    /**
     * Filter, which PlacementBranch to fetch.
     */
    where?: PlacementBranchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlacementBranches to fetch.
     */
    orderBy?: PlacementBranchOrderByWithRelationInput | PlacementBranchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlacementBranches.
     */
    cursor?: PlacementBranchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlacementBranches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlacementBranches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlacementBranches.
     */
    distinct?: PlacementBranchScalarFieldEnum | PlacementBranchScalarFieldEnum[]
  }

  /**
   * PlacementBranch findFirstOrThrow
   */
  export type PlacementBranchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementBranch
     */
    select?: PlacementBranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementBranch
     */
    omit?: PlacementBranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementBranchInclude<ExtArgs> | null
    /**
     * Filter, which PlacementBranch to fetch.
     */
    where?: PlacementBranchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlacementBranches to fetch.
     */
    orderBy?: PlacementBranchOrderByWithRelationInput | PlacementBranchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlacementBranches.
     */
    cursor?: PlacementBranchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlacementBranches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlacementBranches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlacementBranches.
     */
    distinct?: PlacementBranchScalarFieldEnum | PlacementBranchScalarFieldEnum[]
  }

  /**
   * PlacementBranch findMany
   */
  export type PlacementBranchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementBranch
     */
    select?: PlacementBranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementBranch
     */
    omit?: PlacementBranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementBranchInclude<ExtArgs> | null
    /**
     * Filter, which PlacementBranches to fetch.
     */
    where?: PlacementBranchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlacementBranches to fetch.
     */
    orderBy?: PlacementBranchOrderByWithRelationInput | PlacementBranchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PlacementBranches.
     */
    cursor?: PlacementBranchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlacementBranches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlacementBranches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlacementBranches.
     */
    distinct?: PlacementBranchScalarFieldEnum | PlacementBranchScalarFieldEnum[]
  }

  /**
   * PlacementBranch create
   */
  export type PlacementBranchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementBranch
     */
    select?: PlacementBranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementBranch
     */
    omit?: PlacementBranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementBranchInclude<ExtArgs> | null
    /**
     * The data needed to create a PlacementBranch.
     */
    data: XOR<PlacementBranchCreateInput, PlacementBranchUncheckedCreateInput>
  }

  /**
   * PlacementBranch createMany
   */
  export type PlacementBranchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PlacementBranches.
     */
    data: PlacementBranchCreateManyInput | PlacementBranchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PlacementBranch createManyAndReturn
   */
  export type PlacementBranchCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementBranch
     */
    select?: PlacementBranchSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementBranch
     */
    omit?: PlacementBranchOmit<ExtArgs> | null
    /**
     * The data used to create many PlacementBranches.
     */
    data: PlacementBranchCreateManyInput | PlacementBranchCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementBranchIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlacementBranch update
   */
  export type PlacementBranchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementBranch
     */
    select?: PlacementBranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementBranch
     */
    omit?: PlacementBranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementBranchInclude<ExtArgs> | null
    /**
     * The data needed to update a PlacementBranch.
     */
    data: XOR<PlacementBranchUpdateInput, PlacementBranchUncheckedUpdateInput>
    /**
     * Choose, which PlacementBranch to update.
     */
    where: PlacementBranchWhereUniqueInput
  }

  /**
   * PlacementBranch updateMany
   */
  export type PlacementBranchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PlacementBranches.
     */
    data: XOR<PlacementBranchUpdateManyMutationInput, PlacementBranchUncheckedUpdateManyInput>
    /**
     * Filter which PlacementBranches to update
     */
    where?: PlacementBranchWhereInput
    /**
     * Limit how many PlacementBranches to update.
     */
    limit?: number
  }

  /**
   * PlacementBranch updateManyAndReturn
   */
  export type PlacementBranchUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementBranch
     */
    select?: PlacementBranchSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementBranch
     */
    omit?: PlacementBranchOmit<ExtArgs> | null
    /**
     * The data used to update PlacementBranches.
     */
    data: XOR<PlacementBranchUpdateManyMutationInput, PlacementBranchUncheckedUpdateManyInput>
    /**
     * Filter which PlacementBranches to update
     */
    where?: PlacementBranchWhereInput
    /**
     * Limit how many PlacementBranches to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementBranchIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlacementBranch upsert
   */
  export type PlacementBranchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementBranch
     */
    select?: PlacementBranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementBranch
     */
    omit?: PlacementBranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementBranchInclude<ExtArgs> | null
    /**
     * The filter to search for the PlacementBranch to update in case it exists.
     */
    where: PlacementBranchWhereUniqueInput
    /**
     * In case the PlacementBranch found by the `where` argument doesn't exist, create a new PlacementBranch with this data.
     */
    create: XOR<PlacementBranchCreateInput, PlacementBranchUncheckedCreateInput>
    /**
     * In case the PlacementBranch was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlacementBranchUpdateInput, PlacementBranchUncheckedUpdateInput>
  }

  /**
   * PlacementBranch delete
   */
  export type PlacementBranchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementBranch
     */
    select?: PlacementBranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementBranch
     */
    omit?: PlacementBranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementBranchInclude<ExtArgs> | null
    /**
     * Filter which PlacementBranch to delete.
     */
    where: PlacementBranchWhereUniqueInput
  }

  /**
   * PlacementBranch deleteMany
   */
  export type PlacementBranchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlacementBranches to delete
     */
    where?: PlacementBranchWhereInput
    /**
     * Limit how many PlacementBranches to delete.
     */
    limit?: number
  }

  /**
   * PlacementBranch without action
   */
  export type PlacementBranchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementBranch
     */
    select?: PlacementBranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementBranch
     */
    omit?: PlacementBranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementBranchInclude<ExtArgs> | null
  }


  /**
   * Model Attachment
   */

  export type AggregateAttachment = {
    _count: AttachmentCountAggregateOutputType | null
    _avg: AttachmentAvgAggregateOutputType | null
    _sum: AttachmentSumAggregateOutputType | null
    _min: AttachmentMinAggregateOutputType | null
    _max: AttachmentMaxAggregateOutputType | null
  }

  export type AttachmentAvgAggregateOutputType = {
    id: number | null
    placementId: number | null
  }

  export type AttachmentSumAggregateOutputType = {
    id: number | null
    placementId: number | null
  }

  export type AttachmentMinAggregateOutputType = {
    id: number | null
    placementId: number | null
    filePath: string | null
    fileType: string | null
  }

  export type AttachmentMaxAggregateOutputType = {
    id: number | null
    placementId: number | null
    filePath: string | null
    fileType: string | null
  }

  export type AttachmentCountAggregateOutputType = {
    id: number
    placementId: number
    filePath: number
    fileType: number
    _all: number
  }


  export type AttachmentAvgAggregateInputType = {
    id?: true
    placementId?: true
  }

  export type AttachmentSumAggregateInputType = {
    id?: true
    placementId?: true
  }

  export type AttachmentMinAggregateInputType = {
    id?: true
    placementId?: true
    filePath?: true
    fileType?: true
  }

  export type AttachmentMaxAggregateInputType = {
    id?: true
    placementId?: true
    filePath?: true
    fileType?: true
  }

  export type AttachmentCountAggregateInputType = {
    id?: true
    placementId?: true
    filePath?: true
    fileType?: true
    _all?: true
  }

  export type AttachmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attachment to aggregate.
     */
    where?: AttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attachments to fetch.
     */
    orderBy?: AttachmentOrderByWithRelationInput | AttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Attachments
    **/
    _count?: true | AttachmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AttachmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AttachmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AttachmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AttachmentMaxAggregateInputType
  }

  export type GetAttachmentAggregateType<T extends AttachmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAttachment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttachment[P]>
      : GetScalarType<T[P], AggregateAttachment[P]>
  }




  export type AttachmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttachmentWhereInput
    orderBy?: AttachmentOrderByWithAggregationInput | AttachmentOrderByWithAggregationInput[]
    by: AttachmentScalarFieldEnum[] | AttachmentScalarFieldEnum
    having?: AttachmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AttachmentCountAggregateInputType | true
    _avg?: AttachmentAvgAggregateInputType
    _sum?: AttachmentSumAggregateInputType
    _min?: AttachmentMinAggregateInputType
    _max?: AttachmentMaxAggregateInputType
  }

  export type AttachmentGroupByOutputType = {
    id: number
    placementId: number
    filePath: string
    fileType: string
    _count: AttachmentCountAggregateOutputType | null
    _avg: AttachmentAvgAggregateOutputType | null
    _sum: AttachmentSumAggregateOutputType | null
    _min: AttachmentMinAggregateOutputType | null
    _max: AttachmentMaxAggregateOutputType | null
  }

  type GetAttachmentGroupByPayload<T extends AttachmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AttachmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AttachmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttachmentGroupByOutputType[P]>
            : GetScalarType<T[P], AttachmentGroupByOutputType[P]>
        }
      >
    >


  export type AttachmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    placementId?: boolean
    filePath?: boolean
    fileType?: boolean
    placement?: boolean | PlacementDefaultArgs<ExtArgs>
    chunks?: boolean | Attachment$chunksArgs<ExtArgs>
    _count?: boolean | AttachmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attachment"]>

  export type AttachmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    placementId?: boolean
    filePath?: boolean
    fileType?: boolean
    placement?: boolean | PlacementDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attachment"]>

  export type AttachmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    placementId?: boolean
    filePath?: boolean
    fileType?: boolean
    placement?: boolean | PlacementDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attachment"]>

  export type AttachmentSelectScalar = {
    id?: boolean
    placementId?: boolean
    filePath?: boolean
    fileType?: boolean
  }

  export type AttachmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "placementId" | "filePath" | "fileType", ExtArgs["result"]["attachment"]>
  export type AttachmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    placement?: boolean | PlacementDefaultArgs<ExtArgs>
    chunks?: boolean | Attachment$chunksArgs<ExtArgs>
    _count?: boolean | AttachmentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AttachmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    placement?: boolean | PlacementDefaultArgs<ExtArgs>
  }
  export type AttachmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    placement?: boolean | PlacementDefaultArgs<ExtArgs>
  }

  export type $AttachmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Attachment"
    objects: {
      placement: Prisma.$PlacementPayload<ExtArgs>
      chunks: Prisma.$PlacementChunkPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      placementId: number
      filePath: string
      fileType: string
    }, ExtArgs["result"]["attachment"]>
    composites: {}
  }

  type AttachmentGetPayload<S extends boolean | null | undefined | AttachmentDefaultArgs> = $Result.GetResult<Prisma.$AttachmentPayload, S>

  type AttachmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AttachmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AttachmentCountAggregateInputType | true
    }

  export interface AttachmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Attachment'], meta: { name: 'Attachment' } }
    /**
     * Find zero or one Attachment that matches the filter.
     * @param {AttachmentFindUniqueArgs} args - Arguments to find a Attachment
     * @example
     * // Get one Attachment
     * const attachment = await prisma.attachment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AttachmentFindUniqueArgs>(args: SelectSubset<T, AttachmentFindUniqueArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Attachment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AttachmentFindUniqueOrThrowArgs} args - Arguments to find a Attachment
     * @example
     * // Get one Attachment
     * const attachment = await prisma.attachment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AttachmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AttachmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attachment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentFindFirstArgs} args - Arguments to find a Attachment
     * @example
     * // Get one Attachment
     * const attachment = await prisma.attachment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AttachmentFindFirstArgs>(args?: SelectSubset<T, AttachmentFindFirstArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attachment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentFindFirstOrThrowArgs} args - Arguments to find a Attachment
     * @example
     * // Get one Attachment
     * const attachment = await prisma.attachment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AttachmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AttachmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Attachments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Attachments
     * const attachments = await prisma.attachment.findMany()
     * 
     * // Get first 10 Attachments
     * const attachments = await prisma.attachment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attachmentWithIdOnly = await prisma.attachment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AttachmentFindManyArgs>(args?: SelectSubset<T, AttachmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Attachment.
     * @param {AttachmentCreateArgs} args - Arguments to create a Attachment.
     * @example
     * // Create one Attachment
     * const Attachment = await prisma.attachment.create({
     *   data: {
     *     // ... data to create a Attachment
     *   }
     * })
     * 
     */
    create<T extends AttachmentCreateArgs>(args: SelectSubset<T, AttachmentCreateArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Attachments.
     * @param {AttachmentCreateManyArgs} args - Arguments to create many Attachments.
     * @example
     * // Create many Attachments
     * const attachment = await prisma.attachment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AttachmentCreateManyArgs>(args?: SelectSubset<T, AttachmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Attachments and returns the data saved in the database.
     * @param {AttachmentCreateManyAndReturnArgs} args - Arguments to create many Attachments.
     * @example
     * // Create many Attachments
     * const attachment = await prisma.attachment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Attachments and only return the `id`
     * const attachmentWithIdOnly = await prisma.attachment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AttachmentCreateManyAndReturnArgs>(args?: SelectSubset<T, AttachmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Attachment.
     * @param {AttachmentDeleteArgs} args - Arguments to delete one Attachment.
     * @example
     * // Delete one Attachment
     * const Attachment = await prisma.attachment.delete({
     *   where: {
     *     // ... filter to delete one Attachment
     *   }
     * })
     * 
     */
    delete<T extends AttachmentDeleteArgs>(args: SelectSubset<T, AttachmentDeleteArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Attachment.
     * @param {AttachmentUpdateArgs} args - Arguments to update one Attachment.
     * @example
     * // Update one Attachment
     * const attachment = await prisma.attachment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AttachmentUpdateArgs>(args: SelectSubset<T, AttachmentUpdateArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Attachments.
     * @param {AttachmentDeleteManyArgs} args - Arguments to filter Attachments to delete.
     * @example
     * // Delete a few Attachments
     * const { count } = await prisma.attachment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AttachmentDeleteManyArgs>(args?: SelectSubset<T, AttachmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Attachments
     * const attachment = await prisma.attachment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AttachmentUpdateManyArgs>(args: SelectSubset<T, AttachmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attachments and returns the data updated in the database.
     * @param {AttachmentUpdateManyAndReturnArgs} args - Arguments to update many Attachments.
     * @example
     * // Update many Attachments
     * const attachment = await prisma.attachment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Attachments and only return the `id`
     * const attachmentWithIdOnly = await prisma.attachment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AttachmentUpdateManyAndReturnArgs>(args: SelectSubset<T, AttachmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Attachment.
     * @param {AttachmentUpsertArgs} args - Arguments to update or create a Attachment.
     * @example
     * // Update or create a Attachment
     * const attachment = await prisma.attachment.upsert({
     *   create: {
     *     // ... data to create a Attachment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Attachment we want to update
     *   }
     * })
     */
    upsert<T extends AttachmentUpsertArgs>(args: SelectSubset<T, AttachmentUpsertArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Attachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentCountArgs} args - Arguments to filter Attachments to count.
     * @example
     * // Count the number of Attachments
     * const count = await prisma.attachment.count({
     *   where: {
     *     // ... the filter for the Attachments we want to count
     *   }
     * })
    **/
    count<T extends AttachmentCountArgs>(
      args?: Subset<T, AttachmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttachmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Attachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AttachmentAggregateArgs>(args: Subset<T, AttachmentAggregateArgs>): Prisma.PrismaPromise<GetAttachmentAggregateType<T>>

    /**
     * Group by Attachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AttachmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AttachmentGroupByArgs['orderBy'] }
        : { orderBy?: AttachmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AttachmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttachmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Attachment model
   */
  readonly fields: AttachmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Attachment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AttachmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    placement<T extends PlacementDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlacementDefaultArgs<ExtArgs>>): Prisma__PlacementClient<$Result.GetResult<Prisma.$PlacementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    chunks<T extends Attachment$chunksArgs<ExtArgs> = {}>(args?: Subset<T, Attachment$chunksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlacementChunkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Attachment model
   */
  interface AttachmentFieldRefs {
    readonly id: FieldRef<"Attachment", 'Int'>
    readonly placementId: FieldRef<"Attachment", 'Int'>
    readonly filePath: FieldRef<"Attachment", 'String'>
    readonly fileType: FieldRef<"Attachment", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Attachment findUnique
   */
  export type AttachmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter, which Attachment to fetch.
     */
    where: AttachmentWhereUniqueInput
  }

  /**
   * Attachment findUniqueOrThrow
   */
  export type AttachmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter, which Attachment to fetch.
     */
    where: AttachmentWhereUniqueInput
  }

  /**
   * Attachment findFirst
   */
  export type AttachmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter, which Attachment to fetch.
     */
    where?: AttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attachments to fetch.
     */
    orderBy?: AttachmentOrderByWithRelationInput | AttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attachments.
     */
    cursor?: AttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attachments.
     */
    distinct?: AttachmentScalarFieldEnum | AttachmentScalarFieldEnum[]
  }

  /**
   * Attachment findFirstOrThrow
   */
  export type AttachmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter, which Attachment to fetch.
     */
    where?: AttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attachments to fetch.
     */
    orderBy?: AttachmentOrderByWithRelationInput | AttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attachments.
     */
    cursor?: AttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attachments.
     */
    distinct?: AttachmentScalarFieldEnum | AttachmentScalarFieldEnum[]
  }

  /**
   * Attachment findMany
   */
  export type AttachmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter, which Attachments to fetch.
     */
    where?: AttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attachments to fetch.
     */
    orderBy?: AttachmentOrderByWithRelationInput | AttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Attachments.
     */
    cursor?: AttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attachments.
     */
    distinct?: AttachmentScalarFieldEnum | AttachmentScalarFieldEnum[]
  }

  /**
   * Attachment create
   */
  export type AttachmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Attachment.
     */
    data: XOR<AttachmentCreateInput, AttachmentUncheckedCreateInput>
  }

  /**
   * Attachment createMany
   */
  export type AttachmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Attachments.
     */
    data: AttachmentCreateManyInput | AttachmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Attachment createManyAndReturn
   */
  export type AttachmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * The data used to create many Attachments.
     */
    data: AttachmentCreateManyInput | AttachmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Attachment update
   */
  export type AttachmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Attachment.
     */
    data: XOR<AttachmentUpdateInput, AttachmentUncheckedUpdateInput>
    /**
     * Choose, which Attachment to update.
     */
    where: AttachmentWhereUniqueInput
  }

  /**
   * Attachment updateMany
   */
  export type AttachmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Attachments.
     */
    data: XOR<AttachmentUpdateManyMutationInput, AttachmentUncheckedUpdateManyInput>
    /**
     * Filter which Attachments to update
     */
    where?: AttachmentWhereInput
    /**
     * Limit how many Attachments to update.
     */
    limit?: number
  }

  /**
   * Attachment updateManyAndReturn
   */
  export type AttachmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * The data used to update Attachments.
     */
    data: XOR<AttachmentUpdateManyMutationInput, AttachmentUncheckedUpdateManyInput>
    /**
     * Filter which Attachments to update
     */
    where?: AttachmentWhereInput
    /**
     * Limit how many Attachments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Attachment upsert
   */
  export type AttachmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Attachment to update in case it exists.
     */
    where: AttachmentWhereUniqueInput
    /**
     * In case the Attachment found by the `where` argument doesn't exist, create a new Attachment with this data.
     */
    create: XOR<AttachmentCreateInput, AttachmentUncheckedCreateInput>
    /**
     * In case the Attachment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AttachmentUpdateInput, AttachmentUncheckedUpdateInput>
  }

  /**
   * Attachment delete
   */
  export type AttachmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter which Attachment to delete.
     */
    where: AttachmentWhereUniqueInput
  }

  /**
   * Attachment deleteMany
   */
  export type AttachmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attachments to delete
     */
    where?: AttachmentWhereInput
    /**
     * Limit how many Attachments to delete.
     */
    limit?: number
  }

  /**
   * Attachment.chunks
   */
  export type Attachment$chunksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementChunk
     */
    select?: PlacementChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementChunk
     */
    omit?: PlacementChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementChunkInclude<ExtArgs> | null
    where?: PlacementChunkWhereInput
    orderBy?: PlacementChunkOrderByWithRelationInput | PlacementChunkOrderByWithRelationInput[]
    cursor?: PlacementChunkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlacementChunkScalarFieldEnum | PlacementChunkScalarFieldEnum[]
  }

  /**
   * Attachment without action
   */
  export type AttachmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
  }


  /**
   * Model PlacementChunk
   */

  export type AggregatePlacementChunk = {
    _count: PlacementChunkCountAggregateOutputType | null
    _avg: PlacementChunkAvgAggregateOutputType | null
    _sum: PlacementChunkSumAggregateOutputType | null
    _min: PlacementChunkMinAggregateOutputType | null
    _max: PlacementChunkMaxAggregateOutputType | null
  }

  export type PlacementChunkAvgAggregateOutputType = {
    id: number | null
    attachmentId: number | null
  }

  export type PlacementChunkSumAggregateOutputType = {
    id: number | null
    attachmentId: number | null
  }

  export type PlacementChunkMinAggregateOutputType = {
    id: number | null
    attachmentId: number | null
    chunkText: string | null
  }

  export type PlacementChunkMaxAggregateOutputType = {
    id: number | null
    attachmentId: number | null
    chunkText: string | null
  }

  export type PlacementChunkCountAggregateOutputType = {
    id: number
    attachmentId: number
    chunkText: number
    _all: number
  }


  export type PlacementChunkAvgAggregateInputType = {
    id?: true
    attachmentId?: true
  }

  export type PlacementChunkSumAggregateInputType = {
    id?: true
    attachmentId?: true
  }

  export type PlacementChunkMinAggregateInputType = {
    id?: true
    attachmentId?: true
    chunkText?: true
  }

  export type PlacementChunkMaxAggregateInputType = {
    id?: true
    attachmentId?: true
    chunkText?: true
  }

  export type PlacementChunkCountAggregateInputType = {
    id?: true
    attachmentId?: true
    chunkText?: true
    _all?: true
  }

  export type PlacementChunkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlacementChunk to aggregate.
     */
    where?: PlacementChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlacementChunks to fetch.
     */
    orderBy?: PlacementChunkOrderByWithRelationInput | PlacementChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlacementChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlacementChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlacementChunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PlacementChunks
    **/
    _count?: true | PlacementChunkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlacementChunkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlacementChunkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlacementChunkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlacementChunkMaxAggregateInputType
  }

  export type GetPlacementChunkAggregateType<T extends PlacementChunkAggregateArgs> = {
        [P in keyof T & keyof AggregatePlacementChunk]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlacementChunk[P]>
      : GetScalarType<T[P], AggregatePlacementChunk[P]>
  }




  export type PlacementChunkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlacementChunkWhereInput
    orderBy?: PlacementChunkOrderByWithAggregationInput | PlacementChunkOrderByWithAggregationInput[]
    by: PlacementChunkScalarFieldEnum[] | PlacementChunkScalarFieldEnum
    having?: PlacementChunkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlacementChunkCountAggregateInputType | true
    _avg?: PlacementChunkAvgAggregateInputType
    _sum?: PlacementChunkSumAggregateInputType
    _min?: PlacementChunkMinAggregateInputType
    _max?: PlacementChunkMaxAggregateInputType
  }

  export type PlacementChunkGroupByOutputType = {
    id: number
    attachmentId: number
    chunkText: string
    _count: PlacementChunkCountAggregateOutputType | null
    _avg: PlacementChunkAvgAggregateOutputType | null
    _sum: PlacementChunkSumAggregateOutputType | null
    _min: PlacementChunkMinAggregateOutputType | null
    _max: PlacementChunkMaxAggregateOutputType | null
  }

  type GetPlacementChunkGroupByPayload<T extends PlacementChunkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlacementChunkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlacementChunkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlacementChunkGroupByOutputType[P]>
            : GetScalarType<T[P], PlacementChunkGroupByOutputType[P]>
        }
      >
    >


  export type PlacementChunkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    attachmentId?: boolean
    chunkText?: boolean
    attachment?: boolean | AttachmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["placementChunk"]>

  export type PlacementChunkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    attachmentId?: boolean
    chunkText?: boolean
    attachment?: boolean | AttachmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["placementChunk"]>

  export type PlacementChunkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    attachmentId?: boolean
    chunkText?: boolean
    attachment?: boolean | AttachmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["placementChunk"]>

  export type PlacementChunkSelectScalar = {
    id?: boolean
    attachmentId?: boolean
    chunkText?: boolean
  }

  export type PlacementChunkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "attachmentId" | "chunkText", ExtArgs["result"]["placementChunk"]>
  export type PlacementChunkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attachment?: boolean | AttachmentDefaultArgs<ExtArgs>
  }
  export type PlacementChunkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attachment?: boolean | AttachmentDefaultArgs<ExtArgs>
  }
  export type PlacementChunkIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attachment?: boolean | AttachmentDefaultArgs<ExtArgs>
  }

  export type $PlacementChunkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PlacementChunk"
    objects: {
      attachment: Prisma.$AttachmentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      attachmentId: number
      chunkText: string
    }, ExtArgs["result"]["placementChunk"]>
    composites: {}
  }

  type PlacementChunkGetPayload<S extends boolean | null | undefined | PlacementChunkDefaultArgs> = $Result.GetResult<Prisma.$PlacementChunkPayload, S>

  type PlacementChunkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlacementChunkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlacementChunkCountAggregateInputType | true
    }

  export interface PlacementChunkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PlacementChunk'], meta: { name: 'PlacementChunk' } }
    /**
     * Find zero or one PlacementChunk that matches the filter.
     * @param {PlacementChunkFindUniqueArgs} args - Arguments to find a PlacementChunk
     * @example
     * // Get one PlacementChunk
     * const placementChunk = await prisma.placementChunk.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlacementChunkFindUniqueArgs>(args: SelectSubset<T, PlacementChunkFindUniqueArgs<ExtArgs>>): Prisma__PlacementChunkClient<$Result.GetResult<Prisma.$PlacementChunkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PlacementChunk that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlacementChunkFindUniqueOrThrowArgs} args - Arguments to find a PlacementChunk
     * @example
     * // Get one PlacementChunk
     * const placementChunk = await prisma.placementChunk.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlacementChunkFindUniqueOrThrowArgs>(args: SelectSubset<T, PlacementChunkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlacementChunkClient<$Result.GetResult<Prisma.$PlacementChunkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlacementChunk that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlacementChunkFindFirstArgs} args - Arguments to find a PlacementChunk
     * @example
     * // Get one PlacementChunk
     * const placementChunk = await prisma.placementChunk.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlacementChunkFindFirstArgs>(args?: SelectSubset<T, PlacementChunkFindFirstArgs<ExtArgs>>): Prisma__PlacementChunkClient<$Result.GetResult<Prisma.$PlacementChunkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlacementChunk that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlacementChunkFindFirstOrThrowArgs} args - Arguments to find a PlacementChunk
     * @example
     * // Get one PlacementChunk
     * const placementChunk = await prisma.placementChunk.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlacementChunkFindFirstOrThrowArgs>(args?: SelectSubset<T, PlacementChunkFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlacementChunkClient<$Result.GetResult<Prisma.$PlacementChunkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PlacementChunks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlacementChunkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlacementChunks
     * const placementChunks = await prisma.placementChunk.findMany()
     * 
     * // Get first 10 PlacementChunks
     * const placementChunks = await prisma.placementChunk.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const placementChunkWithIdOnly = await prisma.placementChunk.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlacementChunkFindManyArgs>(args?: SelectSubset<T, PlacementChunkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlacementChunkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PlacementChunk.
     * @param {PlacementChunkCreateArgs} args - Arguments to create a PlacementChunk.
     * @example
     * // Create one PlacementChunk
     * const PlacementChunk = await prisma.placementChunk.create({
     *   data: {
     *     // ... data to create a PlacementChunk
     *   }
     * })
     * 
     */
    create<T extends PlacementChunkCreateArgs>(args: SelectSubset<T, PlacementChunkCreateArgs<ExtArgs>>): Prisma__PlacementChunkClient<$Result.GetResult<Prisma.$PlacementChunkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PlacementChunks.
     * @param {PlacementChunkCreateManyArgs} args - Arguments to create many PlacementChunks.
     * @example
     * // Create many PlacementChunks
     * const placementChunk = await prisma.placementChunk.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlacementChunkCreateManyArgs>(args?: SelectSubset<T, PlacementChunkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PlacementChunks and returns the data saved in the database.
     * @param {PlacementChunkCreateManyAndReturnArgs} args - Arguments to create many PlacementChunks.
     * @example
     * // Create many PlacementChunks
     * const placementChunk = await prisma.placementChunk.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PlacementChunks and only return the `id`
     * const placementChunkWithIdOnly = await prisma.placementChunk.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlacementChunkCreateManyAndReturnArgs>(args?: SelectSubset<T, PlacementChunkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlacementChunkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PlacementChunk.
     * @param {PlacementChunkDeleteArgs} args - Arguments to delete one PlacementChunk.
     * @example
     * // Delete one PlacementChunk
     * const PlacementChunk = await prisma.placementChunk.delete({
     *   where: {
     *     // ... filter to delete one PlacementChunk
     *   }
     * })
     * 
     */
    delete<T extends PlacementChunkDeleteArgs>(args: SelectSubset<T, PlacementChunkDeleteArgs<ExtArgs>>): Prisma__PlacementChunkClient<$Result.GetResult<Prisma.$PlacementChunkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PlacementChunk.
     * @param {PlacementChunkUpdateArgs} args - Arguments to update one PlacementChunk.
     * @example
     * // Update one PlacementChunk
     * const placementChunk = await prisma.placementChunk.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlacementChunkUpdateArgs>(args: SelectSubset<T, PlacementChunkUpdateArgs<ExtArgs>>): Prisma__PlacementChunkClient<$Result.GetResult<Prisma.$PlacementChunkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PlacementChunks.
     * @param {PlacementChunkDeleteManyArgs} args - Arguments to filter PlacementChunks to delete.
     * @example
     * // Delete a few PlacementChunks
     * const { count } = await prisma.placementChunk.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlacementChunkDeleteManyArgs>(args?: SelectSubset<T, PlacementChunkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlacementChunks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlacementChunkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlacementChunks
     * const placementChunk = await prisma.placementChunk.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlacementChunkUpdateManyArgs>(args: SelectSubset<T, PlacementChunkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlacementChunks and returns the data updated in the database.
     * @param {PlacementChunkUpdateManyAndReturnArgs} args - Arguments to update many PlacementChunks.
     * @example
     * // Update many PlacementChunks
     * const placementChunk = await prisma.placementChunk.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PlacementChunks and only return the `id`
     * const placementChunkWithIdOnly = await prisma.placementChunk.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlacementChunkUpdateManyAndReturnArgs>(args: SelectSubset<T, PlacementChunkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlacementChunkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PlacementChunk.
     * @param {PlacementChunkUpsertArgs} args - Arguments to update or create a PlacementChunk.
     * @example
     * // Update or create a PlacementChunk
     * const placementChunk = await prisma.placementChunk.upsert({
     *   create: {
     *     // ... data to create a PlacementChunk
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlacementChunk we want to update
     *   }
     * })
     */
    upsert<T extends PlacementChunkUpsertArgs>(args: SelectSubset<T, PlacementChunkUpsertArgs<ExtArgs>>): Prisma__PlacementChunkClient<$Result.GetResult<Prisma.$PlacementChunkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PlacementChunks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlacementChunkCountArgs} args - Arguments to filter PlacementChunks to count.
     * @example
     * // Count the number of PlacementChunks
     * const count = await prisma.placementChunk.count({
     *   where: {
     *     // ... the filter for the PlacementChunks we want to count
     *   }
     * })
    **/
    count<T extends PlacementChunkCountArgs>(
      args?: Subset<T, PlacementChunkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlacementChunkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PlacementChunk.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlacementChunkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlacementChunkAggregateArgs>(args: Subset<T, PlacementChunkAggregateArgs>): Prisma.PrismaPromise<GetPlacementChunkAggregateType<T>>

    /**
     * Group by PlacementChunk.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlacementChunkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlacementChunkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlacementChunkGroupByArgs['orderBy'] }
        : { orderBy?: PlacementChunkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlacementChunkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlacementChunkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PlacementChunk model
   */
  readonly fields: PlacementChunkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PlacementChunk.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlacementChunkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    attachment<T extends AttachmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AttachmentDefaultArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PlacementChunk model
   */
  interface PlacementChunkFieldRefs {
    readonly id: FieldRef<"PlacementChunk", 'Int'>
    readonly attachmentId: FieldRef<"PlacementChunk", 'Int'>
    readonly chunkText: FieldRef<"PlacementChunk", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PlacementChunk findUnique
   */
  export type PlacementChunkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementChunk
     */
    select?: PlacementChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementChunk
     */
    omit?: PlacementChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementChunkInclude<ExtArgs> | null
    /**
     * Filter, which PlacementChunk to fetch.
     */
    where: PlacementChunkWhereUniqueInput
  }

  /**
   * PlacementChunk findUniqueOrThrow
   */
  export type PlacementChunkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementChunk
     */
    select?: PlacementChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementChunk
     */
    omit?: PlacementChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementChunkInclude<ExtArgs> | null
    /**
     * Filter, which PlacementChunk to fetch.
     */
    where: PlacementChunkWhereUniqueInput
  }

  /**
   * PlacementChunk findFirst
   */
  export type PlacementChunkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementChunk
     */
    select?: PlacementChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementChunk
     */
    omit?: PlacementChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementChunkInclude<ExtArgs> | null
    /**
     * Filter, which PlacementChunk to fetch.
     */
    where?: PlacementChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlacementChunks to fetch.
     */
    orderBy?: PlacementChunkOrderByWithRelationInput | PlacementChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlacementChunks.
     */
    cursor?: PlacementChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlacementChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlacementChunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlacementChunks.
     */
    distinct?: PlacementChunkScalarFieldEnum | PlacementChunkScalarFieldEnum[]
  }

  /**
   * PlacementChunk findFirstOrThrow
   */
  export type PlacementChunkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementChunk
     */
    select?: PlacementChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementChunk
     */
    omit?: PlacementChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementChunkInclude<ExtArgs> | null
    /**
     * Filter, which PlacementChunk to fetch.
     */
    where?: PlacementChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlacementChunks to fetch.
     */
    orderBy?: PlacementChunkOrderByWithRelationInput | PlacementChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlacementChunks.
     */
    cursor?: PlacementChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlacementChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlacementChunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlacementChunks.
     */
    distinct?: PlacementChunkScalarFieldEnum | PlacementChunkScalarFieldEnum[]
  }

  /**
   * PlacementChunk findMany
   */
  export type PlacementChunkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementChunk
     */
    select?: PlacementChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementChunk
     */
    omit?: PlacementChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementChunkInclude<ExtArgs> | null
    /**
     * Filter, which PlacementChunks to fetch.
     */
    where?: PlacementChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlacementChunks to fetch.
     */
    orderBy?: PlacementChunkOrderByWithRelationInput | PlacementChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PlacementChunks.
     */
    cursor?: PlacementChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlacementChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlacementChunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlacementChunks.
     */
    distinct?: PlacementChunkScalarFieldEnum | PlacementChunkScalarFieldEnum[]
  }

  /**
   * PlacementChunk create
   */
  export type PlacementChunkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementChunk
     */
    select?: PlacementChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementChunk
     */
    omit?: PlacementChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementChunkInclude<ExtArgs> | null
    /**
     * The data needed to create a PlacementChunk.
     */
    data: XOR<PlacementChunkCreateInput, PlacementChunkUncheckedCreateInput>
  }

  /**
   * PlacementChunk createMany
   */
  export type PlacementChunkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PlacementChunks.
     */
    data: PlacementChunkCreateManyInput | PlacementChunkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PlacementChunk createManyAndReturn
   */
  export type PlacementChunkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementChunk
     */
    select?: PlacementChunkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementChunk
     */
    omit?: PlacementChunkOmit<ExtArgs> | null
    /**
     * The data used to create many PlacementChunks.
     */
    data: PlacementChunkCreateManyInput | PlacementChunkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementChunkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlacementChunk update
   */
  export type PlacementChunkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementChunk
     */
    select?: PlacementChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementChunk
     */
    omit?: PlacementChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementChunkInclude<ExtArgs> | null
    /**
     * The data needed to update a PlacementChunk.
     */
    data: XOR<PlacementChunkUpdateInput, PlacementChunkUncheckedUpdateInput>
    /**
     * Choose, which PlacementChunk to update.
     */
    where: PlacementChunkWhereUniqueInput
  }

  /**
   * PlacementChunk updateMany
   */
  export type PlacementChunkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PlacementChunks.
     */
    data: XOR<PlacementChunkUpdateManyMutationInput, PlacementChunkUncheckedUpdateManyInput>
    /**
     * Filter which PlacementChunks to update
     */
    where?: PlacementChunkWhereInput
    /**
     * Limit how many PlacementChunks to update.
     */
    limit?: number
  }

  /**
   * PlacementChunk updateManyAndReturn
   */
  export type PlacementChunkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementChunk
     */
    select?: PlacementChunkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementChunk
     */
    omit?: PlacementChunkOmit<ExtArgs> | null
    /**
     * The data used to update PlacementChunks.
     */
    data: XOR<PlacementChunkUpdateManyMutationInput, PlacementChunkUncheckedUpdateManyInput>
    /**
     * Filter which PlacementChunks to update
     */
    where?: PlacementChunkWhereInput
    /**
     * Limit how many PlacementChunks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementChunkIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlacementChunk upsert
   */
  export type PlacementChunkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementChunk
     */
    select?: PlacementChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementChunk
     */
    omit?: PlacementChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementChunkInclude<ExtArgs> | null
    /**
     * The filter to search for the PlacementChunk to update in case it exists.
     */
    where: PlacementChunkWhereUniqueInput
    /**
     * In case the PlacementChunk found by the `where` argument doesn't exist, create a new PlacementChunk with this data.
     */
    create: XOR<PlacementChunkCreateInput, PlacementChunkUncheckedCreateInput>
    /**
     * In case the PlacementChunk was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlacementChunkUpdateInput, PlacementChunkUncheckedUpdateInput>
  }

  /**
   * PlacementChunk delete
   */
  export type PlacementChunkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementChunk
     */
    select?: PlacementChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementChunk
     */
    omit?: PlacementChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementChunkInclude<ExtArgs> | null
    /**
     * Filter which PlacementChunk to delete.
     */
    where: PlacementChunkWhereUniqueInput
  }

  /**
   * PlacementChunk deleteMany
   */
  export type PlacementChunkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlacementChunks to delete
     */
    where?: PlacementChunkWhereInput
    /**
     * Limit how many PlacementChunks to delete.
     */
    limit?: number
  }

  /**
   * PlacementChunk without action
   */
  export type PlacementChunkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacementChunk
     */
    select?: PlacementChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlacementChunk
     */
    omit?: PlacementChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementChunkInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    name: 'name',
    rollNo: 'rollNo',
    cgpa: 'cgpa',
    institute: 'institute',
    phone: 'phone',
    branchId: 'branchId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CompanyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    sector: 'sector',
    hiresDepstar: 'hiresDepstar',
    hiresCspit: 'hiresCspit',
    status: 'status',
    avgPackage: 'avgPackage',
    notes: 'notes',
    website: 'website',
    hrContacts: 'hrContacts',
    visits: 'visits',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CompanyScalarFieldEnum = (typeof CompanyScalarFieldEnum)[keyof typeof CompanyScalarFieldEnum]


  export const PlacementScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    position: 'position',
    ctc: 'ctc',
    deadline: 'deadline',
    cgpaCutoff: 'cgpaCutoff',
    description: 'description',
    status: 'status',
    activeRound: 'activeRound',
    appliedCount: 'appliedCount',
    shortlistedCount: 'shortlistedCount',
    offeredCount: 'offeredCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PlacementScalarFieldEnum = (typeof PlacementScalarFieldEnum)[keyof typeof PlacementScalarFieldEnum]


  export const BranchScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type BranchScalarFieldEnum = (typeof BranchScalarFieldEnum)[keyof typeof BranchScalarFieldEnum]


  export const SkillScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type SkillScalarFieldEnum = (typeof SkillScalarFieldEnum)[keyof typeof SkillScalarFieldEnum]


  export const StudentSkillScalarFieldEnum: {
    userId: 'userId',
    skillId: 'skillId'
  };

  export type StudentSkillScalarFieldEnum = (typeof StudentSkillScalarFieldEnum)[keyof typeof StudentSkillScalarFieldEnum]


  export const PlacementSkillScalarFieldEnum: {
    placementId: 'placementId',
    skillId: 'skillId'
  };

  export type PlacementSkillScalarFieldEnum = (typeof PlacementSkillScalarFieldEnum)[keyof typeof PlacementSkillScalarFieldEnum]


  export const PlacementBranchScalarFieldEnum: {
    placementId: 'placementId',
    branchId: 'branchId'
  };

  export type PlacementBranchScalarFieldEnum = (typeof PlacementBranchScalarFieldEnum)[keyof typeof PlacementBranchScalarFieldEnum]


  export const AttachmentScalarFieldEnum: {
    id: 'id',
    placementId: 'placementId',
    filePath: 'filePath',
    fileType: 'fileType'
  };

  export type AttachmentScalarFieldEnum = (typeof AttachmentScalarFieldEnum)[keyof typeof AttachmentScalarFieldEnum]


  export const PlacementChunkScalarFieldEnum: {
    id: 'id',
    attachmentId: 'attachmentId',
    chunkText: 'chunkText'
  };

  export type PlacementChunkScalarFieldEnum = (typeof PlacementChunkScalarFieldEnum)[keyof typeof PlacementChunkScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Institute'
   */
  export type EnumInstituteFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Institute'>
    


  /**
   * Reference to a field of type 'Institute[]'
   */
  export type ListEnumInstituteFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Institute[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    name?: StringFilter<"User"> | string
    rollNo?: StringNullableFilter<"User"> | string | null
    cgpa?: FloatNullableFilter<"User"> | number | null
    institute?: EnumInstituteNullableFilter<"User"> | $Enums.Institute | null
    phone?: StringNullableFilter<"User"> | string | null
    branchId?: IntNullableFilter<"User"> | number | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    branch?: XOR<BranchNullableScalarRelationFilter, BranchWhereInput> | null
    skills?: StudentSkillListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    name?: SortOrder
    rollNo?: SortOrderInput | SortOrder
    cgpa?: SortOrderInput | SortOrder
    institute?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    branchId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    branch?: BranchOrderByWithRelationInput
    skills?: StudentSkillOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    rollNo?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    name?: StringFilter<"User"> | string
    cgpa?: FloatNullableFilter<"User"> | number | null
    institute?: EnumInstituteNullableFilter<"User"> | $Enums.Institute | null
    phone?: StringNullableFilter<"User"> | string | null
    branchId?: IntNullableFilter<"User"> | number | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    branch?: XOR<BranchNullableScalarRelationFilter, BranchWhereInput> | null
    skills?: StudentSkillListRelationFilter
  }, "id" | "email" | "rollNo">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    name?: SortOrder
    rollNo?: SortOrderInput | SortOrder
    cgpa?: SortOrderInput | SortOrder
    institute?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    branchId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    name?: StringWithAggregatesFilter<"User"> | string
    rollNo?: StringNullableWithAggregatesFilter<"User"> | string | null
    cgpa?: FloatNullableWithAggregatesFilter<"User"> | number | null
    institute?: EnumInstituteNullableWithAggregatesFilter<"User"> | $Enums.Institute | null
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    branchId?: IntNullableWithAggregatesFilter<"User"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CompanyWhereInput = {
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    id?: IntFilter<"Company"> | number
    name?: StringFilter<"Company"> | string
    sector?: StringFilter<"Company"> | string
    hiresDepstar?: IntFilter<"Company"> | number
    hiresCspit?: IntFilter<"Company"> | number
    status?: StringFilter<"Company"> | string
    avgPackage?: FloatFilter<"Company"> | number
    notes?: StringNullableFilter<"Company"> | string | null
    website?: StringNullableFilter<"Company"> | string | null
    hrContacts?: JsonNullableFilter<"Company">
    visits?: JsonNullableFilter<"Company">
    createdAt?: DateTimeFilter<"Company"> | Date | string
    updatedAt?: DateTimeFilter<"Company"> | Date | string
    placements?: PlacementListRelationFilter
  }

  export type CompanyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    sector?: SortOrder
    hiresDepstar?: SortOrder
    hiresCspit?: SortOrder
    status?: SortOrder
    avgPackage?: SortOrder
    notes?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    hrContacts?: SortOrderInput | SortOrder
    visits?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    placements?: PlacementOrderByRelationAggregateInput
  }

  export type CompanyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    sector?: StringFilter<"Company"> | string
    hiresDepstar?: IntFilter<"Company"> | number
    hiresCspit?: IntFilter<"Company"> | number
    status?: StringFilter<"Company"> | string
    avgPackage?: FloatFilter<"Company"> | number
    notes?: StringNullableFilter<"Company"> | string | null
    website?: StringNullableFilter<"Company"> | string | null
    hrContacts?: JsonNullableFilter<"Company">
    visits?: JsonNullableFilter<"Company">
    createdAt?: DateTimeFilter<"Company"> | Date | string
    updatedAt?: DateTimeFilter<"Company"> | Date | string
    placements?: PlacementListRelationFilter
  }, "id" | "name">

  export type CompanyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    sector?: SortOrder
    hiresDepstar?: SortOrder
    hiresCspit?: SortOrder
    status?: SortOrder
    avgPackage?: SortOrder
    notes?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    hrContacts?: SortOrderInput | SortOrder
    visits?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CompanyCountOrderByAggregateInput
    _avg?: CompanyAvgOrderByAggregateInput
    _max?: CompanyMaxOrderByAggregateInput
    _min?: CompanyMinOrderByAggregateInput
    _sum?: CompanySumOrderByAggregateInput
  }

  export type CompanyScalarWhereWithAggregatesInput = {
    AND?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    OR?: CompanyScalarWhereWithAggregatesInput[]
    NOT?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Company"> | number
    name?: StringWithAggregatesFilter<"Company"> | string
    sector?: StringWithAggregatesFilter<"Company"> | string
    hiresDepstar?: IntWithAggregatesFilter<"Company"> | number
    hiresCspit?: IntWithAggregatesFilter<"Company"> | number
    status?: StringWithAggregatesFilter<"Company"> | string
    avgPackage?: FloatWithAggregatesFilter<"Company"> | number
    notes?: StringNullableWithAggregatesFilter<"Company"> | string | null
    website?: StringNullableWithAggregatesFilter<"Company"> | string | null
    hrContacts?: JsonNullableWithAggregatesFilter<"Company">
    visits?: JsonNullableWithAggregatesFilter<"Company">
    createdAt?: DateTimeWithAggregatesFilter<"Company"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Company"> | Date | string
  }

  export type PlacementWhereInput = {
    AND?: PlacementWhereInput | PlacementWhereInput[]
    OR?: PlacementWhereInput[]
    NOT?: PlacementWhereInput | PlacementWhereInput[]
    id?: IntFilter<"Placement"> | number
    companyId?: IntFilter<"Placement"> | number
    position?: StringFilter<"Placement"> | string
    ctc?: FloatFilter<"Placement"> | number
    deadline?: DateTimeFilter<"Placement"> | Date | string
    cgpaCutoff?: FloatFilter<"Placement"> | number
    description?: StringNullableFilter<"Placement"> | string | null
    status?: StringFilter<"Placement"> | string
    activeRound?: StringFilter<"Placement"> | string
    appliedCount?: IntFilter<"Placement"> | number
    shortlistedCount?: IntFilter<"Placement"> | number
    offeredCount?: IntFilter<"Placement"> | number
    createdAt?: DateTimeFilter<"Placement"> | Date | string
    updatedAt?: DateTimeFilter<"Placement"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    skills?: PlacementSkillListRelationFilter
    branches?: PlacementBranchListRelationFilter
    attachments?: AttachmentListRelationFilter
  }

  export type PlacementOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    position?: SortOrder
    ctc?: SortOrder
    deadline?: SortOrder
    cgpaCutoff?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    activeRound?: SortOrder
    appliedCount?: SortOrder
    shortlistedCount?: SortOrder
    offeredCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
    skills?: PlacementSkillOrderByRelationAggregateInput
    branches?: PlacementBranchOrderByRelationAggregateInput
    attachments?: AttachmentOrderByRelationAggregateInput
  }

  export type PlacementWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PlacementWhereInput | PlacementWhereInput[]
    OR?: PlacementWhereInput[]
    NOT?: PlacementWhereInput | PlacementWhereInput[]
    companyId?: IntFilter<"Placement"> | number
    position?: StringFilter<"Placement"> | string
    ctc?: FloatFilter<"Placement"> | number
    deadline?: DateTimeFilter<"Placement"> | Date | string
    cgpaCutoff?: FloatFilter<"Placement"> | number
    description?: StringNullableFilter<"Placement"> | string | null
    status?: StringFilter<"Placement"> | string
    activeRound?: StringFilter<"Placement"> | string
    appliedCount?: IntFilter<"Placement"> | number
    shortlistedCount?: IntFilter<"Placement"> | number
    offeredCount?: IntFilter<"Placement"> | number
    createdAt?: DateTimeFilter<"Placement"> | Date | string
    updatedAt?: DateTimeFilter<"Placement"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    skills?: PlacementSkillListRelationFilter
    branches?: PlacementBranchListRelationFilter
    attachments?: AttachmentListRelationFilter
  }, "id">

  export type PlacementOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    position?: SortOrder
    ctc?: SortOrder
    deadline?: SortOrder
    cgpaCutoff?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    activeRound?: SortOrder
    appliedCount?: SortOrder
    shortlistedCount?: SortOrder
    offeredCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PlacementCountOrderByAggregateInput
    _avg?: PlacementAvgOrderByAggregateInput
    _max?: PlacementMaxOrderByAggregateInput
    _min?: PlacementMinOrderByAggregateInput
    _sum?: PlacementSumOrderByAggregateInput
  }

  export type PlacementScalarWhereWithAggregatesInput = {
    AND?: PlacementScalarWhereWithAggregatesInput | PlacementScalarWhereWithAggregatesInput[]
    OR?: PlacementScalarWhereWithAggregatesInput[]
    NOT?: PlacementScalarWhereWithAggregatesInput | PlacementScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Placement"> | number
    companyId?: IntWithAggregatesFilter<"Placement"> | number
    position?: StringWithAggregatesFilter<"Placement"> | string
    ctc?: FloatWithAggregatesFilter<"Placement"> | number
    deadline?: DateTimeWithAggregatesFilter<"Placement"> | Date | string
    cgpaCutoff?: FloatWithAggregatesFilter<"Placement"> | number
    description?: StringNullableWithAggregatesFilter<"Placement"> | string | null
    status?: StringWithAggregatesFilter<"Placement"> | string
    activeRound?: StringWithAggregatesFilter<"Placement"> | string
    appliedCount?: IntWithAggregatesFilter<"Placement"> | number
    shortlistedCount?: IntWithAggregatesFilter<"Placement"> | number
    offeredCount?: IntWithAggregatesFilter<"Placement"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Placement"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Placement"> | Date | string
  }

  export type BranchWhereInput = {
    AND?: BranchWhereInput | BranchWhereInput[]
    OR?: BranchWhereInput[]
    NOT?: BranchWhereInput | BranchWhereInput[]
    id?: IntFilter<"Branch"> | number
    name?: StringFilter<"Branch"> | string
    users?: UserListRelationFilter
    placements?: PlacementBranchListRelationFilter
  }

  export type BranchOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    users?: UserOrderByRelationAggregateInput
    placements?: PlacementBranchOrderByRelationAggregateInput
  }

  export type BranchWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: BranchWhereInput | BranchWhereInput[]
    OR?: BranchWhereInput[]
    NOT?: BranchWhereInput | BranchWhereInput[]
    users?: UserListRelationFilter
    placements?: PlacementBranchListRelationFilter
  }, "id" | "name">

  export type BranchOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: BranchCountOrderByAggregateInput
    _avg?: BranchAvgOrderByAggregateInput
    _max?: BranchMaxOrderByAggregateInput
    _min?: BranchMinOrderByAggregateInput
    _sum?: BranchSumOrderByAggregateInput
  }

  export type BranchScalarWhereWithAggregatesInput = {
    AND?: BranchScalarWhereWithAggregatesInput | BranchScalarWhereWithAggregatesInput[]
    OR?: BranchScalarWhereWithAggregatesInput[]
    NOT?: BranchScalarWhereWithAggregatesInput | BranchScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Branch"> | number
    name?: StringWithAggregatesFilter<"Branch"> | string
  }

  export type SkillWhereInput = {
    AND?: SkillWhereInput | SkillWhereInput[]
    OR?: SkillWhereInput[]
    NOT?: SkillWhereInput | SkillWhereInput[]
    id?: IntFilter<"Skill"> | number
    name?: StringFilter<"Skill"> | string
    students?: StudentSkillListRelationFilter
    placements?: PlacementSkillListRelationFilter
  }

  export type SkillOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    students?: StudentSkillOrderByRelationAggregateInput
    placements?: PlacementSkillOrderByRelationAggregateInput
  }

  export type SkillWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: SkillWhereInput | SkillWhereInput[]
    OR?: SkillWhereInput[]
    NOT?: SkillWhereInput | SkillWhereInput[]
    students?: StudentSkillListRelationFilter
    placements?: PlacementSkillListRelationFilter
  }, "id" | "name">

  export type SkillOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: SkillCountOrderByAggregateInput
    _avg?: SkillAvgOrderByAggregateInput
    _max?: SkillMaxOrderByAggregateInput
    _min?: SkillMinOrderByAggregateInput
    _sum?: SkillSumOrderByAggregateInput
  }

  export type SkillScalarWhereWithAggregatesInput = {
    AND?: SkillScalarWhereWithAggregatesInput | SkillScalarWhereWithAggregatesInput[]
    OR?: SkillScalarWhereWithAggregatesInput[]
    NOT?: SkillScalarWhereWithAggregatesInput | SkillScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Skill"> | number
    name?: StringWithAggregatesFilter<"Skill"> | string
  }

  export type StudentSkillWhereInput = {
    AND?: StudentSkillWhereInput | StudentSkillWhereInput[]
    OR?: StudentSkillWhereInput[]
    NOT?: StudentSkillWhereInput | StudentSkillWhereInput[]
    userId?: IntFilter<"StudentSkill"> | number
    skillId?: IntFilter<"StudentSkill"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    skill?: XOR<SkillScalarRelationFilter, SkillWhereInput>
  }

  export type StudentSkillOrderByWithRelationInput = {
    userId?: SortOrder
    skillId?: SortOrder
    user?: UserOrderByWithRelationInput
    skill?: SkillOrderByWithRelationInput
  }

  export type StudentSkillWhereUniqueInput = Prisma.AtLeast<{
    userId_skillId?: StudentSkillUserIdSkillIdCompoundUniqueInput
    AND?: StudentSkillWhereInput | StudentSkillWhereInput[]
    OR?: StudentSkillWhereInput[]
    NOT?: StudentSkillWhereInput | StudentSkillWhereInput[]
    userId?: IntFilter<"StudentSkill"> | number
    skillId?: IntFilter<"StudentSkill"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    skill?: XOR<SkillScalarRelationFilter, SkillWhereInput>
  }, "userId_skillId">

  export type StudentSkillOrderByWithAggregationInput = {
    userId?: SortOrder
    skillId?: SortOrder
    _count?: StudentSkillCountOrderByAggregateInput
    _avg?: StudentSkillAvgOrderByAggregateInput
    _max?: StudentSkillMaxOrderByAggregateInput
    _min?: StudentSkillMinOrderByAggregateInput
    _sum?: StudentSkillSumOrderByAggregateInput
  }

  export type StudentSkillScalarWhereWithAggregatesInput = {
    AND?: StudentSkillScalarWhereWithAggregatesInput | StudentSkillScalarWhereWithAggregatesInput[]
    OR?: StudentSkillScalarWhereWithAggregatesInput[]
    NOT?: StudentSkillScalarWhereWithAggregatesInput | StudentSkillScalarWhereWithAggregatesInput[]
    userId?: IntWithAggregatesFilter<"StudentSkill"> | number
    skillId?: IntWithAggregatesFilter<"StudentSkill"> | number
  }

  export type PlacementSkillWhereInput = {
    AND?: PlacementSkillWhereInput | PlacementSkillWhereInput[]
    OR?: PlacementSkillWhereInput[]
    NOT?: PlacementSkillWhereInput | PlacementSkillWhereInput[]
    placementId?: IntFilter<"PlacementSkill"> | number
    skillId?: IntFilter<"PlacementSkill"> | number
    placement?: XOR<PlacementScalarRelationFilter, PlacementWhereInput>
    skill?: XOR<SkillScalarRelationFilter, SkillWhereInput>
  }

  export type PlacementSkillOrderByWithRelationInput = {
    placementId?: SortOrder
    skillId?: SortOrder
    placement?: PlacementOrderByWithRelationInput
    skill?: SkillOrderByWithRelationInput
  }

  export type PlacementSkillWhereUniqueInput = Prisma.AtLeast<{
    placementId_skillId?: PlacementSkillPlacementIdSkillIdCompoundUniqueInput
    AND?: PlacementSkillWhereInput | PlacementSkillWhereInput[]
    OR?: PlacementSkillWhereInput[]
    NOT?: PlacementSkillWhereInput | PlacementSkillWhereInput[]
    placementId?: IntFilter<"PlacementSkill"> | number
    skillId?: IntFilter<"PlacementSkill"> | number
    placement?: XOR<PlacementScalarRelationFilter, PlacementWhereInput>
    skill?: XOR<SkillScalarRelationFilter, SkillWhereInput>
  }, "placementId_skillId">

  export type PlacementSkillOrderByWithAggregationInput = {
    placementId?: SortOrder
    skillId?: SortOrder
    _count?: PlacementSkillCountOrderByAggregateInput
    _avg?: PlacementSkillAvgOrderByAggregateInput
    _max?: PlacementSkillMaxOrderByAggregateInput
    _min?: PlacementSkillMinOrderByAggregateInput
    _sum?: PlacementSkillSumOrderByAggregateInput
  }

  export type PlacementSkillScalarWhereWithAggregatesInput = {
    AND?: PlacementSkillScalarWhereWithAggregatesInput | PlacementSkillScalarWhereWithAggregatesInput[]
    OR?: PlacementSkillScalarWhereWithAggregatesInput[]
    NOT?: PlacementSkillScalarWhereWithAggregatesInput | PlacementSkillScalarWhereWithAggregatesInput[]
    placementId?: IntWithAggregatesFilter<"PlacementSkill"> | number
    skillId?: IntWithAggregatesFilter<"PlacementSkill"> | number
  }

  export type PlacementBranchWhereInput = {
    AND?: PlacementBranchWhereInput | PlacementBranchWhereInput[]
    OR?: PlacementBranchWhereInput[]
    NOT?: PlacementBranchWhereInput | PlacementBranchWhereInput[]
    placementId?: IntFilter<"PlacementBranch"> | number
    branchId?: IntFilter<"PlacementBranch"> | number
    placement?: XOR<PlacementScalarRelationFilter, PlacementWhereInput>
    branch?: XOR<BranchScalarRelationFilter, BranchWhereInput>
  }

  export type PlacementBranchOrderByWithRelationInput = {
    placementId?: SortOrder
    branchId?: SortOrder
    placement?: PlacementOrderByWithRelationInput
    branch?: BranchOrderByWithRelationInput
  }

  export type PlacementBranchWhereUniqueInput = Prisma.AtLeast<{
    placementId_branchId?: PlacementBranchPlacementIdBranchIdCompoundUniqueInput
    AND?: PlacementBranchWhereInput | PlacementBranchWhereInput[]
    OR?: PlacementBranchWhereInput[]
    NOT?: PlacementBranchWhereInput | PlacementBranchWhereInput[]
    placementId?: IntFilter<"PlacementBranch"> | number
    branchId?: IntFilter<"PlacementBranch"> | number
    placement?: XOR<PlacementScalarRelationFilter, PlacementWhereInput>
    branch?: XOR<BranchScalarRelationFilter, BranchWhereInput>
  }, "placementId_branchId">

  export type PlacementBranchOrderByWithAggregationInput = {
    placementId?: SortOrder
    branchId?: SortOrder
    _count?: PlacementBranchCountOrderByAggregateInput
    _avg?: PlacementBranchAvgOrderByAggregateInput
    _max?: PlacementBranchMaxOrderByAggregateInput
    _min?: PlacementBranchMinOrderByAggregateInput
    _sum?: PlacementBranchSumOrderByAggregateInput
  }

  export type PlacementBranchScalarWhereWithAggregatesInput = {
    AND?: PlacementBranchScalarWhereWithAggregatesInput | PlacementBranchScalarWhereWithAggregatesInput[]
    OR?: PlacementBranchScalarWhereWithAggregatesInput[]
    NOT?: PlacementBranchScalarWhereWithAggregatesInput | PlacementBranchScalarWhereWithAggregatesInput[]
    placementId?: IntWithAggregatesFilter<"PlacementBranch"> | number
    branchId?: IntWithAggregatesFilter<"PlacementBranch"> | number
  }

  export type AttachmentWhereInput = {
    AND?: AttachmentWhereInput | AttachmentWhereInput[]
    OR?: AttachmentWhereInput[]
    NOT?: AttachmentWhereInput | AttachmentWhereInput[]
    id?: IntFilter<"Attachment"> | number
    placementId?: IntFilter<"Attachment"> | number
    filePath?: StringFilter<"Attachment"> | string
    fileType?: StringFilter<"Attachment"> | string
    placement?: XOR<PlacementScalarRelationFilter, PlacementWhereInput>
    chunks?: PlacementChunkListRelationFilter
  }

  export type AttachmentOrderByWithRelationInput = {
    id?: SortOrder
    placementId?: SortOrder
    filePath?: SortOrder
    fileType?: SortOrder
    placement?: PlacementOrderByWithRelationInput
    chunks?: PlacementChunkOrderByRelationAggregateInput
  }

  export type AttachmentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AttachmentWhereInput | AttachmentWhereInput[]
    OR?: AttachmentWhereInput[]
    NOT?: AttachmentWhereInput | AttachmentWhereInput[]
    placementId?: IntFilter<"Attachment"> | number
    filePath?: StringFilter<"Attachment"> | string
    fileType?: StringFilter<"Attachment"> | string
    placement?: XOR<PlacementScalarRelationFilter, PlacementWhereInput>
    chunks?: PlacementChunkListRelationFilter
  }, "id">

  export type AttachmentOrderByWithAggregationInput = {
    id?: SortOrder
    placementId?: SortOrder
    filePath?: SortOrder
    fileType?: SortOrder
    _count?: AttachmentCountOrderByAggregateInput
    _avg?: AttachmentAvgOrderByAggregateInput
    _max?: AttachmentMaxOrderByAggregateInput
    _min?: AttachmentMinOrderByAggregateInput
    _sum?: AttachmentSumOrderByAggregateInput
  }

  export type AttachmentScalarWhereWithAggregatesInput = {
    AND?: AttachmentScalarWhereWithAggregatesInput | AttachmentScalarWhereWithAggregatesInput[]
    OR?: AttachmentScalarWhereWithAggregatesInput[]
    NOT?: AttachmentScalarWhereWithAggregatesInput | AttachmentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Attachment"> | number
    placementId?: IntWithAggregatesFilter<"Attachment"> | number
    filePath?: StringWithAggregatesFilter<"Attachment"> | string
    fileType?: StringWithAggregatesFilter<"Attachment"> | string
  }

  export type PlacementChunkWhereInput = {
    AND?: PlacementChunkWhereInput | PlacementChunkWhereInput[]
    OR?: PlacementChunkWhereInput[]
    NOT?: PlacementChunkWhereInput | PlacementChunkWhereInput[]
    id?: IntFilter<"PlacementChunk"> | number
    attachmentId?: IntFilter<"PlacementChunk"> | number
    chunkText?: StringFilter<"PlacementChunk"> | string
    attachment?: XOR<AttachmentScalarRelationFilter, AttachmentWhereInput>
  }

  export type PlacementChunkOrderByWithRelationInput = {
    id?: SortOrder
    attachmentId?: SortOrder
    chunkText?: SortOrder
    attachment?: AttachmentOrderByWithRelationInput
  }

  export type PlacementChunkWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PlacementChunkWhereInput | PlacementChunkWhereInput[]
    OR?: PlacementChunkWhereInput[]
    NOT?: PlacementChunkWhereInput | PlacementChunkWhereInput[]
    attachmentId?: IntFilter<"PlacementChunk"> | number
    chunkText?: StringFilter<"PlacementChunk"> | string
    attachment?: XOR<AttachmentScalarRelationFilter, AttachmentWhereInput>
  }, "id">

  export type PlacementChunkOrderByWithAggregationInput = {
    id?: SortOrder
    attachmentId?: SortOrder
    chunkText?: SortOrder
    _count?: PlacementChunkCountOrderByAggregateInput
    _avg?: PlacementChunkAvgOrderByAggregateInput
    _max?: PlacementChunkMaxOrderByAggregateInput
    _min?: PlacementChunkMinOrderByAggregateInput
    _sum?: PlacementChunkSumOrderByAggregateInput
  }

  export type PlacementChunkScalarWhereWithAggregatesInput = {
    AND?: PlacementChunkScalarWhereWithAggregatesInput | PlacementChunkScalarWhereWithAggregatesInput[]
    OR?: PlacementChunkScalarWhereWithAggregatesInput[]
    NOT?: PlacementChunkScalarWhereWithAggregatesInput | PlacementChunkScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PlacementChunk"> | number
    attachmentId?: IntWithAggregatesFilter<"PlacementChunk"> | number
    chunkText?: StringWithAggregatesFilter<"PlacementChunk"> | string
  }

  export type UserCreateInput = {
    email: string
    passwordHash: string
    role?: $Enums.Role
    name: string
    rollNo?: string | null
    cgpa?: number | null
    institute?: $Enums.Institute | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    branch?: BranchCreateNestedOneWithoutUsersInput
    skills?: StudentSkillCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    passwordHash: string
    role?: $Enums.Role
    name: string
    rollNo?: string | null
    cgpa?: number | null
    institute?: $Enums.Institute | null
    phone?: string | null
    branchId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    skills?: StudentSkillUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    rollNo?: NullableStringFieldUpdateOperationsInput | string | null
    cgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    institute?: NullableEnumInstituteFieldUpdateOperationsInput | $Enums.Institute | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    branch?: BranchUpdateOneWithoutUsersNestedInput
    skills?: StudentSkillUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    rollNo?: NullableStringFieldUpdateOperationsInput | string | null
    cgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    institute?: NullableEnumInstituteFieldUpdateOperationsInput | $Enums.Institute | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    branchId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skills?: StudentSkillUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    passwordHash: string
    role?: $Enums.Role
    name: string
    rollNo?: string | null
    cgpa?: number | null
    institute?: $Enums.Institute | null
    phone?: string | null
    branchId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    rollNo?: NullableStringFieldUpdateOperationsInput | string | null
    cgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    institute?: NullableEnumInstituteFieldUpdateOperationsInput | $Enums.Institute | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    rollNo?: NullableStringFieldUpdateOperationsInput | string | null
    cgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    institute?: NullableEnumInstituteFieldUpdateOperationsInput | $Enums.Institute | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    branchId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyCreateInput = {
    name: string
    sector: string
    hiresDepstar?: number
    hiresCspit?: number
    status?: string
    avgPackage: number
    notes?: string | null
    website?: string | null
    hrContacts?: NullableJsonNullValueInput | InputJsonValue
    visits?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    placements?: PlacementCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateInput = {
    id?: number
    name: string
    sector: string
    hiresDepstar?: number
    hiresCspit?: number
    status?: string
    avgPackage: number
    notes?: string | null
    website?: string | null
    hrContacts?: NullableJsonNullValueInput | InputJsonValue
    visits?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    placements?: PlacementUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    sector?: StringFieldUpdateOperationsInput | string
    hiresDepstar?: IntFieldUpdateOperationsInput | number
    hiresCspit?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    avgPackage?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    hrContacts?: NullableJsonNullValueInput | InputJsonValue
    visits?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    placements?: PlacementUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    sector?: StringFieldUpdateOperationsInput | string
    hiresDepstar?: IntFieldUpdateOperationsInput | number
    hiresCspit?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    avgPackage?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    hrContacts?: NullableJsonNullValueInput | InputJsonValue
    visits?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    placements?: PlacementUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateManyInput = {
    id?: number
    name: string
    sector: string
    hiresDepstar?: number
    hiresCspit?: number
    status?: string
    avgPackage: number
    notes?: string | null
    website?: string | null
    hrContacts?: NullableJsonNullValueInput | InputJsonValue
    visits?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompanyUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    sector?: StringFieldUpdateOperationsInput | string
    hiresDepstar?: IntFieldUpdateOperationsInput | number
    hiresCspit?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    avgPackage?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    hrContacts?: NullableJsonNullValueInput | InputJsonValue
    visits?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    sector?: StringFieldUpdateOperationsInput | string
    hiresDepstar?: IntFieldUpdateOperationsInput | number
    hiresCspit?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    avgPackage?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    hrContacts?: NullableJsonNullValueInput | InputJsonValue
    visits?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlacementCreateInput = {
    position: string
    ctc: number
    deadline: Date | string
    cgpaCutoff: number
    description?: string | null
    status?: string
    activeRound?: string
    appliedCount?: number
    shortlistedCount?: number
    offeredCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutPlacementsInput
    skills?: PlacementSkillCreateNestedManyWithoutPlacementInput
    branches?: PlacementBranchCreateNestedManyWithoutPlacementInput
    attachments?: AttachmentCreateNestedManyWithoutPlacementInput
  }

  export type PlacementUncheckedCreateInput = {
    id?: number
    companyId: number
    position: string
    ctc: number
    deadline: Date | string
    cgpaCutoff: number
    description?: string | null
    status?: string
    activeRound?: string
    appliedCount?: number
    shortlistedCount?: number
    offeredCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    skills?: PlacementSkillUncheckedCreateNestedManyWithoutPlacementInput
    branches?: PlacementBranchUncheckedCreateNestedManyWithoutPlacementInput
    attachments?: AttachmentUncheckedCreateNestedManyWithoutPlacementInput
  }

  export type PlacementUpdateInput = {
    position?: StringFieldUpdateOperationsInput | string
    ctc?: FloatFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    cgpaCutoff?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    activeRound?: StringFieldUpdateOperationsInput | string
    appliedCount?: IntFieldUpdateOperationsInput | number
    shortlistedCount?: IntFieldUpdateOperationsInput | number
    offeredCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutPlacementsNestedInput
    skills?: PlacementSkillUpdateManyWithoutPlacementNestedInput
    branches?: PlacementBranchUpdateManyWithoutPlacementNestedInput
    attachments?: AttachmentUpdateManyWithoutPlacementNestedInput
  }

  export type PlacementUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    position?: StringFieldUpdateOperationsInput | string
    ctc?: FloatFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    cgpaCutoff?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    activeRound?: StringFieldUpdateOperationsInput | string
    appliedCount?: IntFieldUpdateOperationsInput | number
    shortlistedCount?: IntFieldUpdateOperationsInput | number
    offeredCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skills?: PlacementSkillUncheckedUpdateManyWithoutPlacementNestedInput
    branches?: PlacementBranchUncheckedUpdateManyWithoutPlacementNestedInput
    attachments?: AttachmentUncheckedUpdateManyWithoutPlacementNestedInput
  }

  export type PlacementCreateManyInput = {
    id?: number
    companyId: number
    position: string
    ctc: number
    deadline: Date | string
    cgpaCutoff: number
    description?: string | null
    status?: string
    activeRound?: string
    appliedCount?: number
    shortlistedCount?: number
    offeredCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlacementUpdateManyMutationInput = {
    position?: StringFieldUpdateOperationsInput | string
    ctc?: FloatFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    cgpaCutoff?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    activeRound?: StringFieldUpdateOperationsInput | string
    appliedCount?: IntFieldUpdateOperationsInput | number
    shortlistedCount?: IntFieldUpdateOperationsInput | number
    offeredCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlacementUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    position?: StringFieldUpdateOperationsInput | string
    ctc?: FloatFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    cgpaCutoff?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    activeRound?: StringFieldUpdateOperationsInput | string
    appliedCount?: IntFieldUpdateOperationsInput | number
    shortlistedCount?: IntFieldUpdateOperationsInput | number
    offeredCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BranchCreateInput = {
    name: string
    users?: UserCreateNestedManyWithoutBranchInput
    placements?: PlacementBranchCreateNestedManyWithoutBranchInput
  }

  export type BranchUncheckedCreateInput = {
    id?: number
    name: string
    users?: UserUncheckedCreateNestedManyWithoutBranchInput
    placements?: PlacementBranchUncheckedCreateNestedManyWithoutBranchInput
  }

  export type BranchUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    users?: UserUpdateManyWithoutBranchNestedInput
    placements?: PlacementBranchUpdateManyWithoutBranchNestedInput
  }

  export type BranchUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    users?: UserUncheckedUpdateManyWithoutBranchNestedInput
    placements?: PlacementBranchUncheckedUpdateManyWithoutBranchNestedInput
  }

  export type BranchCreateManyInput = {
    id?: number
    name: string
  }

  export type BranchUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type BranchUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type SkillCreateInput = {
    name: string
    students?: StudentSkillCreateNestedManyWithoutSkillInput
    placements?: PlacementSkillCreateNestedManyWithoutSkillInput
  }

  export type SkillUncheckedCreateInput = {
    id?: number
    name: string
    students?: StudentSkillUncheckedCreateNestedManyWithoutSkillInput
    placements?: PlacementSkillUncheckedCreateNestedManyWithoutSkillInput
  }

  export type SkillUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    students?: StudentSkillUpdateManyWithoutSkillNestedInput
    placements?: PlacementSkillUpdateManyWithoutSkillNestedInput
  }

  export type SkillUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    students?: StudentSkillUncheckedUpdateManyWithoutSkillNestedInput
    placements?: PlacementSkillUncheckedUpdateManyWithoutSkillNestedInput
  }

  export type SkillCreateManyInput = {
    id?: number
    name: string
  }

  export type SkillUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type SkillUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type StudentSkillCreateInput = {
    user: UserCreateNestedOneWithoutSkillsInput
    skill: SkillCreateNestedOneWithoutStudentsInput
  }

  export type StudentSkillUncheckedCreateInput = {
    userId: number
    skillId: number
  }

  export type StudentSkillUpdateInput = {
    user?: UserUpdateOneRequiredWithoutSkillsNestedInput
    skill?: SkillUpdateOneRequiredWithoutStudentsNestedInput
  }

  export type StudentSkillUncheckedUpdateInput = {
    userId?: IntFieldUpdateOperationsInput | number
    skillId?: IntFieldUpdateOperationsInput | number
  }

  export type StudentSkillCreateManyInput = {
    userId: number
    skillId: number
  }

  export type StudentSkillUpdateManyMutationInput = {

  }

  export type StudentSkillUncheckedUpdateManyInput = {
    userId?: IntFieldUpdateOperationsInput | number
    skillId?: IntFieldUpdateOperationsInput | number
  }

  export type PlacementSkillCreateInput = {
    placement: PlacementCreateNestedOneWithoutSkillsInput
    skill: SkillCreateNestedOneWithoutPlacementsInput
  }

  export type PlacementSkillUncheckedCreateInput = {
    placementId: number
    skillId: number
  }

  export type PlacementSkillUpdateInput = {
    placement?: PlacementUpdateOneRequiredWithoutSkillsNestedInput
    skill?: SkillUpdateOneRequiredWithoutPlacementsNestedInput
  }

  export type PlacementSkillUncheckedUpdateInput = {
    placementId?: IntFieldUpdateOperationsInput | number
    skillId?: IntFieldUpdateOperationsInput | number
  }

  export type PlacementSkillCreateManyInput = {
    placementId: number
    skillId: number
  }

  export type PlacementSkillUpdateManyMutationInput = {

  }

  export type PlacementSkillUncheckedUpdateManyInput = {
    placementId?: IntFieldUpdateOperationsInput | number
    skillId?: IntFieldUpdateOperationsInput | number
  }

  export type PlacementBranchCreateInput = {
    placement: PlacementCreateNestedOneWithoutBranchesInput
    branch: BranchCreateNestedOneWithoutPlacementsInput
  }

  export type PlacementBranchUncheckedCreateInput = {
    placementId: number
    branchId: number
  }

  export type PlacementBranchUpdateInput = {
    placement?: PlacementUpdateOneRequiredWithoutBranchesNestedInput
    branch?: BranchUpdateOneRequiredWithoutPlacementsNestedInput
  }

  export type PlacementBranchUncheckedUpdateInput = {
    placementId?: IntFieldUpdateOperationsInput | number
    branchId?: IntFieldUpdateOperationsInput | number
  }

  export type PlacementBranchCreateManyInput = {
    placementId: number
    branchId: number
  }

  export type PlacementBranchUpdateManyMutationInput = {

  }

  export type PlacementBranchUncheckedUpdateManyInput = {
    placementId?: IntFieldUpdateOperationsInput | number
    branchId?: IntFieldUpdateOperationsInput | number
  }

  export type AttachmentCreateInput = {
    filePath: string
    fileType: string
    placement: PlacementCreateNestedOneWithoutAttachmentsInput
    chunks?: PlacementChunkCreateNestedManyWithoutAttachmentInput
  }

  export type AttachmentUncheckedCreateInput = {
    id?: number
    placementId: number
    filePath: string
    fileType: string
    chunks?: PlacementChunkUncheckedCreateNestedManyWithoutAttachmentInput
  }

  export type AttachmentUpdateInput = {
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    placement?: PlacementUpdateOneRequiredWithoutAttachmentsNestedInput
    chunks?: PlacementChunkUpdateManyWithoutAttachmentNestedInput
  }

  export type AttachmentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    placementId?: IntFieldUpdateOperationsInput | number
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    chunks?: PlacementChunkUncheckedUpdateManyWithoutAttachmentNestedInput
  }

  export type AttachmentCreateManyInput = {
    id?: number
    placementId: number
    filePath: string
    fileType: string
  }

  export type AttachmentUpdateManyMutationInput = {
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
  }

  export type AttachmentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    placementId?: IntFieldUpdateOperationsInput | number
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
  }

  export type PlacementChunkCreateInput = {
    chunkText: string
    attachment: AttachmentCreateNestedOneWithoutChunksInput
  }

  export type PlacementChunkUncheckedCreateInput = {
    id?: number
    attachmentId: number
    chunkText: string
  }

  export type PlacementChunkUpdateInput = {
    chunkText?: StringFieldUpdateOperationsInput | string
    attachment?: AttachmentUpdateOneRequiredWithoutChunksNestedInput
  }

  export type PlacementChunkUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    attachmentId?: IntFieldUpdateOperationsInput | number
    chunkText?: StringFieldUpdateOperationsInput | string
  }

  export type PlacementChunkCreateManyInput = {
    id?: number
    attachmentId: number
    chunkText: string
  }

  export type PlacementChunkUpdateManyMutationInput = {
    chunkText?: StringFieldUpdateOperationsInput | string
  }

  export type PlacementChunkUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    attachmentId?: IntFieldUpdateOperationsInput | number
    chunkText?: StringFieldUpdateOperationsInput | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type EnumInstituteNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Institute | EnumInstituteFieldRefInput<$PrismaModel> | null
    in?: $Enums.Institute[] | ListEnumInstituteFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Institute[] | ListEnumInstituteFieldRefInput<$PrismaModel> | null
    not?: NestedEnumInstituteNullableFilter<$PrismaModel> | $Enums.Institute | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BranchNullableScalarRelationFilter = {
    is?: BranchWhereInput | null
    isNot?: BranchWhereInput | null
  }

  export type StudentSkillListRelationFilter = {
    every?: StudentSkillWhereInput
    some?: StudentSkillWhereInput
    none?: StudentSkillWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type StudentSkillOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    name?: SortOrder
    rollNo?: SortOrder
    cgpa?: SortOrder
    institute?: SortOrder
    phone?: SortOrder
    branchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    cgpa?: SortOrder
    branchId?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    name?: SortOrder
    rollNo?: SortOrder
    cgpa?: SortOrder
    institute?: SortOrder
    phone?: SortOrder
    branchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    name?: SortOrder
    rollNo?: SortOrder
    cgpa?: SortOrder
    institute?: SortOrder
    phone?: SortOrder
    branchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    cgpa?: SortOrder
    branchId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumInstituteNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Institute | EnumInstituteFieldRefInput<$PrismaModel> | null
    in?: $Enums.Institute[] | ListEnumInstituteFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Institute[] | ListEnumInstituteFieldRefInput<$PrismaModel> | null
    not?: NestedEnumInstituteNullableWithAggregatesFilter<$PrismaModel> | $Enums.Institute | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumInstituteNullableFilter<$PrismaModel>
    _max?: NestedEnumInstituteNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type PlacementListRelationFilter = {
    every?: PlacementWhereInput
    some?: PlacementWhereInput
    none?: PlacementWhereInput
  }

  export type PlacementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompanyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    sector?: SortOrder
    hiresDepstar?: SortOrder
    hiresCspit?: SortOrder
    status?: SortOrder
    avgPackage?: SortOrder
    notes?: SortOrder
    website?: SortOrder
    hrContacts?: SortOrder
    visits?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanyAvgOrderByAggregateInput = {
    id?: SortOrder
    hiresDepstar?: SortOrder
    hiresCspit?: SortOrder
    avgPackage?: SortOrder
  }

  export type CompanyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    sector?: SortOrder
    hiresDepstar?: SortOrder
    hiresCspit?: SortOrder
    status?: SortOrder
    avgPackage?: SortOrder
    notes?: SortOrder
    website?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    sector?: SortOrder
    hiresDepstar?: SortOrder
    hiresCspit?: SortOrder
    status?: SortOrder
    avgPackage?: SortOrder
    notes?: SortOrder
    website?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanySumOrderByAggregateInput = {
    id?: SortOrder
    hiresDepstar?: SortOrder
    hiresCspit?: SortOrder
    avgPackage?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type CompanyScalarRelationFilter = {
    is?: CompanyWhereInput
    isNot?: CompanyWhereInput
  }

  export type PlacementSkillListRelationFilter = {
    every?: PlacementSkillWhereInput
    some?: PlacementSkillWhereInput
    none?: PlacementSkillWhereInput
  }

  export type PlacementBranchListRelationFilter = {
    every?: PlacementBranchWhereInput
    some?: PlacementBranchWhereInput
    none?: PlacementBranchWhereInput
  }

  export type AttachmentListRelationFilter = {
    every?: AttachmentWhereInput
    some?: AttachmentWhereInput
    none?: AttachmentWhereInput
  }

  export type PlacementSkillOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlacementBranchOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AttachmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlacementCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    position?: SortOrder
    ctc?: SortOrder
    deadline?: SortOrder
    cgpaCutoff?: SortOrder
    description?: SortOrder
    status?: SortOrder
    activeRound?: SortOrder
    appliedCount?: SortOrder
    shortlistedCount?: SortOrder
    offeredCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlacementAvgOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    ctc?: SortOrder
    cgpaCutoff?: SortOrder
    appliedCount?: SortOrder
    shortlistedCount?: SortOrder
    offeredCount?: SortOrder
  }

  export type PlacementMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    position?: SortOrder
    ctc?: SortOrder
    deadline?: SortOrder
    cgpaCutoff?: SortOrder
    description?: SortOrder
    status?: SortOrder
    activeRound?: SortOrder
    appliedCount?: SortOrder
    shortlistedCount?: SortOrder
    offeredCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlacementMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    position?: SortOrder
    ctc?: SortOrder
    deadline?: SortOrder
    cgpaCutoff?: SortOrder
    description?: SortOrder
    status?: SortOrder
    activeRound?: SortOrder
    appliedCount?: SortOrder
    shortlistedCount?: SortOrder
    offeredCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlacementSumOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    ctc?: SortOrder
    cgpaCutoff?: SortOrder
    appliedCount?: SortOrder
    shortlistedCount?: SortOrder
    offeredCount?: SortOrder
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BranchCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type BranchAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BranchMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type BranchMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type BranchSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SkillCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type SkillAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SkillMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type SkillMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type SkillSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SkillScalarRelationFilter = {
    is?: SkillWhereInput
    isNot?: SkillWhereInput
  }

  export type StudentSkillUserIdSkillIdCompoundUniqueInput = {
    userId: number
    skillId: number
  }

  export type StudentSkillCountOrderByAggregateInput = {
    userId?: SortOrder
    skillId?: SortOrder
  }

  export type StudentSkillAvgOrderByAggregateInput = {
    userId?: SortOrder
    skillId?: SortOrder
  }

  export type StudentSkillMaxOrderByAggregateInput = {
    userId?: SortOrder
    skillId?: SortOrder
  }

  export type StudentSkillMinOrderByAggregateInput = {
    userId?: SortOrder
    skillId?: SortOrder
  }

  export type StudentSkillSumOrderByAggregateInput = {
    userId?: SortOrder
    skillId?: SortOrder
  }

  export type PlacementScalarRelationFilter = {
    is?: PlacementWhereInput
    isNot?: PlacementWhereInput
  }

  export type PlacementSkillPlacementIdSkillIdCompoundUniqueInput = {
    placementId: number
    skillId: number
  }

  export type PlacementSkillCountOrderByAggregateInput = {
    placementId?: SortOrder
    skillId?: SortOrder
  }

  export type PlacementSkillAvgOrderByAggregateInput = {
    placementId?: SortOrder
    skillId?: SortOrder
  }

  export type PlacementSkillMaxOrderByAggregateInput = {
    placementId?: SortOrder
    skillId?: SortOrder
  }

  export type PlacementSkillMinOrderByAggregateInput = {
    placementId?: SortOrder
    skillId?: SortOrder
  }

  export type PlacementSkillSumOrderByAggregateInput = {
    placementId?: SortOrder
    skillId?: SortOrder
  }

  export type BranchScalarRelationFilter = {
    is?: BranchWhereInput
    isNot?: BranchWhereInput
  }

  export type PlacementBranchPlacementIdBranchIdCompoundUniqueInput = {
    placementId: number
    branchId: number
  }

  export type PlacementBranchCountOrderByAggregateInput = {
    placementId?: SortOrder
    branchId?: SortOrder
  }

  export type PlacementBranchAvgOrderByAggregateInput = {
    placementId?: SortOrder
    branchId?: SortOrder
  }

  export type PlacementBranchMaxOrderByAggregateInput = {
    placementId?: SortOrder
    branchId?: SortOrder
  }

  export type PlacementBranchMinOrderByAggregateInput = {
    placementId?: SortOrder
    branchId?: SortOrder
  }

  export type PlacementBranchSumOrderByAggregateInput = {
    placementId?: SortOrder
    branchId?: SortOrder
  }

  export type PlacementChunkListRelationFilter = {
    every?: PlacementChunkWhereInput
    some?: PlacementChunkWhereInput
    none?: PlacementChunkWhereInput
  }

  export type PlacementChunkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AttachmentCountOrderByAggregateInput = {
    id?: SortOrder
    placementId?: SortOrder
    filePath?: SortOrder
    fileType?: SortOrder
  }

  export type AttachmentAvgOrderByAggregateInput = {
    id?: SortOrder
    placementId?: SortOrder
  }

  export type AttachmentMaxOrderByAggregateInput = {
    id?: SortOrder
    placementId?: SortOrder
    filePath?: SortOrder
    fileType?: SortOrder
  }

  export type AttachmentMinOrderByAggregateInput = {
    id?: SortOrder
    placementId?: SortOrder
    filePath?: SortOrder
    fileType?: SortOrder
  }

  export type AttachmentSumOrderByAggregateInput = {
    id?: SortOrder
    placementId?: SortOrder
  }

  export type AttachmentScalarRelationFilter = {
    is?: AttachmentWhereInput
    isNot?: AttachmentWhereInput
  }

  export type PlacementChunkCountOrderByAggregateInput = {
    id?: SortOrder
    attachmentId?: SortOrder
    chunkText?: SortOrder
  }

  export type PlacementChunkAvgOrderByAggregateInput = {
    id?: SortOrder
    attachmentId?: SortOrder
  }

  export type PlacementChunkMaxOrderByAggregateInput = {
    id?: SortOrder
    attachmentId?: SortOrder
    chunkText?: SortOrder
  }

  export type PlacementChunkMinOrderByAggregateInput = {
    id?: SortOrder
    attachmentId?: SortOrder
    chunkText?: SortOrder
  }

  export type PlacementChunkSumOrderByAggregateInput = {
    id?: SortOrder
    attachmentId?: SortOrder
  }

  export type BranchCreateNestedOneWithoutUsersInput = {
    create?: XOR<BranchCreateWithoutUsersInput, BranchUncheckedCreateWithoutUsersInput>
    connectOrCreate?: BranchCreateOrConnectWithoutUsersInput
    connect?: BranchWhereUniqueInput
  }

  export type StudentSkillCreateNestedManyWithoutUserInput = {
    create?: XOR<StudentSkillCreateWithoutUserInput, StudentSkillUncheckedCreateWithoutUserInput> | StudentSkillCreateWithoutUserInput[] | StudentSkillUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StudentSkillCreateOrConnectWithoutUserInput | StudentSkillCreateOrConnectWithoutUserInput[]
    createMany?: StudentSkillCreateManyUserInputEnvelope
    connect?: StudentSkillWhereUniqueInput | StudentSkillWhereUniqueInput[]
  }

  export type StudentSkillUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<StudentSkillCreateWithoutUserInput, StudentSkillUncheckedCreateWithoutUserInput> | StudentSkillCreateWithoutUserInput[] | StudentSkillUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StudentSkillCreateOrConnectWithoutUserInput | StudentSkillCreateOrConnectWithoutUserInput[]
    createMany?: StudentSkillCreateManyUserInputEnvelope
    connect?: StudentSkillWhereUniqueInput | StudentSkillWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableEnumInstituteFieldUpdateOperationsInput = {
    set?: $Enums.Institute | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BranchUpdateOneWithoutUsersNestedInput = {
    create?: XOR<BranchCreateWithoutUsersInput, BranchUncheckedCreateWithoutUsersInput>
    connectOrCreate?: BranchCreateOrConnectWithoutUsersInput
    upsert?: BranchUpsertWithoutUsersInput
    disconnect?: BranchWhereInput | boolean
    delete?: BranchWhereInput | boolean
    connect?: BranchWhereUniqueInput
    update?: XOR<XOR<BranchUpdateToOneWithWhereWithoutUsersInput, BranchUpdateWithoutUsersInput>, BranchUncheckedUpdateWithoutUsersInput>
  }

  export type StudentSkillUpdateManyWithoutUserNestedInput = {
    create?: XOR<StudentSkillCreateWithoutUserInput, StudentSkillUncheckedCreateWithoutUserInput> | StudentSkillCreateWithoutUserInput[] | StudentSkillUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StudentSkillCreateOrConnectWithoutUserInput | StudentSkillCreateOrConnectWithoutUserInput[]
    upsert?: StudentSkillUpsertWithWhereUniqueWithoutUserInput | StudentSkillUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: StudentSkillCreateManyUserInputEnvelope
    set?: StudentSkillWhereUniqueInput | StudentSkillWhereUniqueInput[]
    disconnect?: StudentSkillWhereUniqueInput | StudentSkillWhereUniqueInput[]
    delete?: StudentSkillWhereUniqueInput | StudentSkillWhereUniqueInput[]
    connect?: StudentSkillWhereUniqueInput | StudentSkillWhereUniqueInput[]
    update?: StudentSkillUpdateWithWhereUniqueWithoutUserInput | StudentSkillUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: StudentSkillUpdateManyWithWhereWithoutUserInput | StudentSkillUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: StudentSkillScalarWhereInput | StudentSkillScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StudentSkillUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<StudentSkillCreateWithoutUserInput, StudentSkillUncheckedCreateWithoutUserInput> | StudentSkillCreateWithoutUserInput[] | StudentSkillUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StudentSkillCreateOrConnectWithoutUserInput | StudentSkillCreateOrConnectWithoutUserInput[]
    upsert?: StudentSkillUpsertWithWhereUniqueWithoutUserInput | StudentSkillUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: StudentSkillCreateManyUserInputEnvelope
    set?: StudentSkillWhereUniqueInput | StudentSkillWhereUniqueInput[]
    disconnect?: StudentSkillWhereUniqueInput | StudentSkillWhereUniqueInput[]
    delete?: StudentSkillWhereUniqueInput | StudentSkillWhereUniqueInput[]
    connect?: StudentSkillWhereUniqueInput | StudentSkillWhereUniqueInput[]
    update?: StudentSkillUpdateWithWhereUniqueWithoutUserInput | StudentSkillUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: StudentSkillUpdateManyWithWhereWithoutUserInput | StudentSkillUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: StudentSkillScalarWhereInput | StudentSkillScalarWhereInput[]
  }

  export type PlacementCreateNestedManyWithoutCompanyInput = {
    create?: XOR<PlacementCreateWithoutCompanyInput, PlacementUncheckedCreateWithoutCompanyInput> | PlacementCreateWithoutCompanyInput[] | PlacementUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: PlacementCreateOrConnectWithoutCompanyInput | PlacementCreateOrConnectWithoutCompanyInput[]
    createMany?: PlacementCreateManyCompanyInputEnvelope
    connect?: PlacementWhereUniqueInput | PlacementWhereUniqueInput[]
  }

  export type PlacementUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<PlacementCreateWithoutCompanyInput, PlacementUncheckedCreateWithoutCompanyInput> | PlacementCreateWithoutCompanyInput[] | PlacementUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: PlacementCreateOrConnectWithoutCompanyInput | PlacementCreateOrConnectWithoutCompanyInput[]
    createMany?: PlacementCreateManyCompanyInputEnvelope
    connect?: PlacementWhereUniqueInput | PlacementWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PlacementUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<PlacementCreateWithoutCompanyInput, PlacementUncheckedCreateWithoutCompanyInput> | PlacementCreateWithoutCompanyInput[] | PlacementUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: PlacementCreateOrConnectWithoutCompanyInput | PlacementCreateOrConnectWithoutCompanyInput[]
    upsert?: PlacementUpsertWithWhereUniqueWithoutCompanyInput | PlacementUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: PlacementCreateManyCompanyInputEnvelope
    set?: PlacementWhereUniqueInput | PlacementWhereUniqueInput[]
    disconnect?: PlacementWhereUniqueInput | PlacementWhereUniqueInput[]
    delete?: PlacementWhereUniqueInput | PlacementWhereUniqueInput[]
    connect?: PlacementWhereUniqueInput | PlacementWhereUniqueInput[]
    update?: PlacementUpdateWithWhereUniqueWithoutCompanyInput | PlacementUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: PlacementUpdateManyWithWhereWithoutCompanyInput | PlacementUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: PlacementScalarWhereInput | PlacementScalarWhereInput[]
  }

  export type PlacementUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<PlacementCreateWithoutCompanyInput, PlacementUncheckedCreateWithoutCompanyInput> | PlacementCreateWithoutCompanyInput[] | PlacementUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: PlacementCreateOrConnectWithoutCompanyInput | PlacementCreateOrConnectWithoutCompanyInput[]
    upsert?: PlacementUpsertWithWhereUniqueWithoutCompanyInput | PlacementUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: PlacementCreateManyCompanyInputEnvelope
    set?: PlacementWhereUniqueInput | PlacementWhereUniqueInput[]
    disconnect?: PlacementWhereUniqueInput | PlacementWhereUniqueInput[]
    delete?: PlacementWhereUniqueInput | PlacementWhereUniqueInput[]
    connect?: PlacementWhereUniqueInput | PlacementWhereUniqueInput[]
    update?: PlacementUpdateWithWhereUniqueWithoutCompanyInput | PlacementUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: PlacementUpdateManyWithWhereWithoutCompanyInput | PlacementUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: PlacementScalarWhereInput | PlacementScalarWhereInput[]
  }

  export type CompanyCreateNestedOneWithoutPlacementsInput = {
    create?: XOR<CompanyCreateWithoutPlacementsInput, CompanyUncheckedCreateWithoutPlacementsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutPlacementsInput
    connect?: CompanyWhereUniqueInput
  }

  export type PlacementSkillCreateNestedManyWithoutPlacementInput = {
    create?: XOR<PlacementSkillCreateWithoutPlacementInput, PlacementSkillUncheckedCreateWithoutPlacementInput> | PlacementSkillCreateWithoutPlacementInput[] | PlacementSkillUncheckedCreateWithoutPlacementInput[]
    connectOrCreate?: PlacementSkillCreateOrConnectWithoutPlacementInput | PlacementSkillCreateOrConnectWithoutPlacementInput[]
    createMany?: PlacementSkillCreateManyPlacementInputEnvelope
    connect?: PlacementSkillWhereUniqueInput | PlacementSkillWhereUniqueInput[]
  }

  export type PlacementBranchCreateNestedManyWithoutPlacementInput = {
    create?: XOR<PlacementBranchCreateWithoutPlacementInput, PlacementBranchUncheckedCreateWithoutPlacementInput> | PlacementBranchCreateWithoutPlacementInput[] | PlacementBranchUncheckedCreateWithoutPlacementInput[]
    connectOrCreate?: PlacementBranchCreateOrConnectWithoutPlacementInput | PlacementBranchCreateOrConnectWithoutPlacementInput[]
    createMany?: PlacementBranchCreateManyPlacementInputEnvelope
    connect?: PlacementBranchWhereUniqueInput | PlacementBranchWhereUniqueInput[]
  }

  export type AttachmentCreateNestedManyWithoutPlacementInput = {
    create?: XOR<AttachmentCreateWithoutPlacementInput, AttachmentUncheckedCreateWithoutPlacementInput> | AttachmentCreateWithoutPlacementInput[] | AttachmentUncheckedCreateWithoutPlacementInput[]
    connectOrCreate?: AttachmentCreateOrConnectWithoutPlacementInput | AttachmentCreateOrConnectWithoutPlacementInput[]
    createMany?: AttachmentCreateManyPlacementInputEnvelope
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
  }

  export type PlacementSkillUncheckedCreateNestedManyWithoutPlacementInput = {
    create?: XOR<PlacementSkillCreateWithoutPlacementInput, PlacementSkillUncheckedCreateWithoutPlacementInput> | PlacementSkillCreateWithoutPlacementInput[] | PlacementSkillUncheckedCreateWithoutPlacementInput[]
    connectOrCreate?: PlacementSkillCreateOrConnectWithoutPlacementInput | PlacementSkillCreateOrConnectWithoutPlacementInput[]
    createMany?: PlacementSkillCreateManyPlacementInputEnvelope
    connect?: PlacementSkillWhereUniqueInput | PlacementSkillWhereUniqueInput[]
  }

  export type PlacementBranchUncheckedCreateNestedManyWithoutPlacementInput = {
    create?: XOR<PlacementBranchCreateWithoutPlacementInput, PlacementBranchUncheckedCreateWithoutPlacementInput> | PlacementBranchCreateWithoutPlacementInput[] | PlacementBranchUncheckedCreateWithoutPlacementInput[]
    connectOrCreate?: PlacementBranchCreateOrConnectWithoutPlacementInput | PlacementBranchCreateOrConnectWithoutPlacementInput[]
    createMany?: PlacementBranchCreateManyPlacementInputEnvelope
    connect?: PlacementBranchWhereUniqueInput | PlacementBranchWhereUniqueInput[]
  }

  export type AttachmentUncheckedCreateNestedManyWithoutPlacementInput = {
    create?: XOR<AttachmentCreateWithoutPlacementInput, AttachmentUncheckedCreateWithoutPlacementInput> | AttachmentCreateWithoutPlacementInput[] | AttachmentUncheckedCreateWithoutPlacementInput[]
    connectOrCreate?: AttachmentCreateOrConnectWithoutPlacementInput | AttachmentCreateOrConnectWithoutPlacementInput[]
    createMany?: AttachmentCreateManyPlacementInputEnvelope
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
  }

  export type CompanyUpdateOneRequiredWithoutPlacementsNestedInput = {
    create?: XOR<CompanyCreateWithoutPlacementsInput, CompanyUncheckedCreateWithoutPlacementsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutPlacementsInput
    upsert?: CompanyUpsertWithoutPlacementsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutPlacementsInput, CompanyUpdateWithoutPlacementsInput>, CompanyUncheckedUpdateWithoutPlacementsInput>
  }

  export type PlacementSkillUpdateManyWithoutPlacementNestedInput = {
    create?: XOR<PlacementSkillCreateWithoutPlacementInput, PlacementSkillUncheckedCreateWithoutPlacementInput> | PlacementSkillCreateWithoutPlacementInput[] | PlacementSkillUncheckedCreateWithoutPlacementInput[]
    connectOrCreate?: PlacementSkillCreateOrConnectWithoutPlacementInput | PlacementSkillCreateOrConnectWithoutPlacementInput[]
    upsert?: PlacementSkillUpsertWithWhereUniqueWithoutPlacementInput | PlacementSkillUpsertWithWhereUniqueWithoutPlacementInput[]
    createMany?: PlacementSkillCreateManyPlacementInputEnvelope
    set?: PlacementSkillWhereUniqueInput | PlacementSkillWhereUniqueInput[]
    disconnect?: PlacementSkillWhereUniqueInput | PlacementSkillWhereUniqueInput[]
    delete?: PlacementSkillWhereUniqueInput | PlacementSkillWhereUniqueInput[]
    connect?: PlacementSkillWhereUniqueInput | PlacementSkillWhereUniqueInput[]
    update?: PlacementSkillUpdateWithWhereUniqueWithoutPlacementInput | PlacementSkillUpdateWithWhereUniqueWithoutPlacementInput[]
    updateMany?: PlacementSkillUpdateManyWithWhereWithoutPlacementInput | PlacementSkillUpdateManyWithWhereWithoutPlacementInput[]
    deleteMany?: PlacementSkillScalarWhereInput | PlacementSkillScalarWhereInput[]
  }

  export type PlacementBranchUpdateManyWithoutPlacementNestedInput = {
    create?: XOR<PlacementBranchCreateWithoutPlacementInput, PlacementBranchUncheckedCreateWithoutPlacementInput> | PlacementBranchCreateWithoutPlacementInput[] | PlacementBranchUncheckedCreateWithoutPlacementInput[]
    connectOrCreate?: PlacementBranchCreateOrConnectWithoutPlacementInput | PlacementBranchCreateOrConnectWithoutPlacementInput[]
    upsert?: PlacementBranchUpsertWithWhereUniqueWithoutPlacementInput | PlacementBranchUpsertWithWhereUniqueWithoutPlacementInput[]
    createMany?: PlacementBranchCreateManyPlacementInputEnvelope
    set?: PlacementBranchWhereUniqueInput | PlacementBranchWhereUniqueInput[]
    disconnect?: PlacementBranchWhereUniqueInput | PlacementBranchWhereUniqueInput[]
    delete?: PlacementBranchWhereUniqueInput | PlacementBranchWhereUniqueInput[]
    connect?: PlacementBranchWhereUniqueInput | PlacementBranchWhereUniqueInput[]
    update?: PlacementBranchUpdateWithWhereUniqueWithoutPlacementInput | PlacementBranchUpdateWithWhereUniqueWithoutPlacementInput[]
    updateMany?: PlacementBranchUpdateManyWithWhereWithoutPlacementInput | PlacementBranchUpdateManyWithWhereWithoutPlacementInput[]
    deleteMany?: PlacementBranchScalarWhereInput | PlacementBranchScalarWhereInput[]
  }

  export type AttachmentUpdateManyWithoutPlacementNestedInput = {
    create?: XOR<AttachmentCreateWithoutPlacementInput, AttachmentUncheckedCreateWithoutPlacementInput> | AttachmentCreateWithoutPlacementInput[] | AttachmentUncheckedCreateWithoutPlacementInput[]
    connectOrCreate?: AttachmentCreateOrConnectWithoutPlacementInput | AttachmentCreateOrConnectWithoutPlacementInput[]
    upsert?: AttachmentUpsertWithWhereUniqueWithoutPlacementInput | AttachmentUpsertWithWhereUniqueWithoutPlacementInput[]
    createMany?: AttachmentCreateManyPlacementInputEnvelope
    set?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    disconnect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    delete?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    update?: AttachmentUpdateWithWhereUniqueWithoutPlacementInput | AttachmentUpdateWithWhereUniqueWithoutPlacementInput[]
    updateMany?: AttachmentUpdateManyWithWhereWithoutPlacementInput | AttachmentUpdateManyWithWhereWithoutPlacementInput[]
    deleteMany?: AttachmentScalarWhereInput | AttachmentScalarWhereInput[]
  }

  export type PlacementSkillUncheckedUpdateManyWithoutPlacementNestedInput = {
    create?: XOR<PlacementSkillCreateWithoutPlacementInput, PlacementSkillUncheckedCreateWithoutPlacementInput> | PlacementSkillCreateWithoutPlacementInput[] | PlacementSkillUncheckedCreateWithoutPlacementInput[]
    connectOrCreate?: PlacementSkillCreateOrConnectWithoutPlacementInput | PlacementSkillCreateOrConnectWithoutPlacementInput[]
    upsert?: PlacementSkillUpsertWithWhereUniqueWithoutPlacementInput | PlacementSkillUpsertWithWhereUniqueWithoutPlacementInput[]
    createMany?: PlacementSkillCreateManyPlacementInputEnvelope
    set?: PlacementSkillWhereUniqueInput | PlacementSkillWhereUniqueInput[]
    disconnect?: PlacementSkillWhereUniqueInput | PlacementSkillWhereUniqueInput[]
    delete?: PlacementSkillWhereUniqueInput | PlacementSkillWhereUniqueInput[]
    connect?: PlacementSkillWhereUniqueInput | PlacementSkillWhereUniqueInput[]
    update?: PlacementSkillUpdateWithWhereUniqueWithoutPlacementInput | PlacementSkillUpdateWithWhereUniqueWithoutPlacementInput[]
    updateMany?: PlacementSkillUpdateManyWithWhereWithoutPlacementInput | PlacementSkillUpdateManyWithWhereWithoutPlacementInput[]
    deleteMany?: PlacementSkillScalarWhereInput | PlacementSkillScalarWhereInput[]
  }

  export type PlacementBranchUncheckedUpdateManyWithoutPlacementNestedInput = {
    create?: XOR<PlacementBranchCreateWithoutPlacementInput, PlacementBranchUncheckedCreateWithoutPlacementInput> | PlacementBranchCreateWithoutPlacementInput[] | PlacementBranchUncheckedCreateWithoutPlacementInput[]
    connectOrCreate?: PlacementBranchCreateOrConnectWithoutPlacementInput | PlacementBranchCreateOrConnectWithoutPlacementInput[]
    upsert?: PlacementBranchUpsertWithWhereUniqueWithoutPlacementInput | PlacementBranchUpsertWithWhereUniqueWithoutPlacementInput[]
    createMany?: PlacementBranchCreateManyPlacementInputEnvelope
    set?: PlacementBranchWhereUniqueInput | PlacementBranchWhereUniqueInput[]
    disconnect?: PlacementBranchWhereUniqueInput | PlacementBranchWhereUniqueInput[]
    delete?: PlacementBranchWhereUniqueInput | PlacementBranchWhereUniqueInput[]
    connect?: PlacementBranchWhereUniqueInput | PlacementBranchWhereUniqueInput[]
    update?: PlacementBranchUpdateWithWhereUniqueWithoutPlacementInput | PlacementBranchUpdateWithWhereUniqueWithoutPlacementInput[]
    updateMany?: PlacementBranchUpdateManyWithWhereWithoutPlacementInput | PlacementBranchUpdateManyWithWhereWithoutPlacementInput[]
    deleteMany?: PlacementBranchScalarWhereInput | PlacementBranchScalarWhereInput[]
  }

  export type AttachmentUncheckedUpdateManyWithoutPlacementNestedInput = {
    create?: XOR<AttachmentCreateWithoutPlacementInput, AttachmentUncheckedCreateWithoutPlacementInput> | AttachmentCreateWithoutPlacementInput[] | AttachmentUncheckedCreateWithoutPlacementInput[]
    connectOrCreate?: AttachmentCreateOrConnectWithoutPlacementInput | AttachmentCreateOrConnectWithoutPlacementInput[]
    upsert?: AttachmentUpsertWithWhereUniqueWithoutPlacementInput | AttachmentUpsertWithWhereUniqueWithoutPlacementInput[]
    createMany?: AttachmentCreateManyPlacementInputEnvelope
    set?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    disconnect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    delete?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    update?: AttachmentUpdateWithWhereUniqueWithoutPlacementInput | AttachmentUpdateWithWhereUniqueWithoutPlacementInput[]
    updateMany?: AttachmentUpdateManyWithWhereWithoutPlacementInput | AttachmentUpdateManyWithWhereWithoutPlacementInput[]
    deleteMany?: AttachmentScalarWhereInput | AttachmentScalarWhereInput[]
  }

  export type UserCreateNestedManyWithoutBranchInput = {
    create?: XOR<UserCreateWithoutBranchInput, UserUncheckedCreateWithoutBranchInput> | UserCreateWithoutBranchInput[] | UserUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: UserCreateOrConnectWithoutBranchInput | UserCreateOrConnectWithoutBranchInput[]
    createMany?: UserCreateManyBranchInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type PlacementBranchCreateNestedManyWithoutBranchInput = {
    create?: XOR<PlacementBranchCreateWithoutBranchInput, PlacementBranchUncheckedCreateWithoutBranchInput> | PlacementBranchCreateWithoutBranchInput[] | PlacementBranchUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: PlacementBranchCreateOrConnectWithoutBranchInput | PlacementBranchCreateOrConnectWithoutBranchInput[]
    createMany?: PlacementBranchCreateManyBranchInputEnvelope
    connect?: PlacementBranchWhereUniqueInput | PlacementBranchWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutBranchInput = {
    create?: XOR<UserCreateWithoutBranchInput, UserUncheckedCreateWithoutBranchInput> | UserCreateWithoutBranchInput[] | UserUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: UserCreateOrConnectWithoutBranchInput | UserCreateOrConnectWithoutBranchInput[]
    createMany?: UserCreateManyBranchInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type PlacementBranchUncheckedCreateNestedManyWithoutBranchInput = {
    create?: XOR<PlacementBranchCreateWithoutBranchInput, PlacementBranchUncheckedCreateWithoutBranchInput> | PlacementBranchCreateWithoutBranchInput[] | PlacementBranchUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: PlacementBranchCreateOrConnectWithoutBranchInput | PlacementBranchCreateOrConnectWithoutBranchInput[]
    createMany?: PlacementBranchCreateManyBranchInputEnvelope
    connect?: PlacementBranchWhereUniqueInput | PlacementBranchWhereUniqueInput[]
  }

  export type UserUpdateManyWithoutBranchNestedInput = {
    create?: XOR<UserCreateWithoutBranchInput, UserUncheckedCreateWithoutBranchInput> | UserCreateWithoutBranchInput[] | UserUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: UserCreateOrConnectWithoutBranchInput | UserCreateOrConnectWithoutBranchInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutBranchInput | UserUpsertWithWhereUniqueWithoutBranchInput[]
    createMany?: UserCreateManyBranchInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutBranchInput | UserUpdateWithWhereUniqueWithoutBranchInput[]
    updateMany?: UserUpdateManyWithWhereWithoutBranchInput | UserUpdateManyWithWhereWithoutBranchInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type PlacementBranchUpdateManyWithoutBranchNestedInput = {
    create?: XOR<PlacementBranchCreateWithoutBranchInput, PlacementBranchUncheckedCreateWithoutBranchInput> | PlacementBranchCreateWithoutBranchInput[] | PlacementBranchUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: PlacementBranchCreateOrConnectWithoutBranchInput | PlacementBranchCreateOrConnectWithoutBranchInput[]
    upsert?: PlacementBranchUpsertWithWhereUniqueWithoutBranchInput | PlacementBranchUpsertWithWhereUniqueWithoutBranchInput[]
    createMany?: PlacementBranchCreateManyBranchInputEnvelope
    set?: PlacementBranchWhereUniqueInput | PlacementBranchWhereUniqueInput[]
    disconnect?: PlacementBranchWhereUniqueInput | PlacementBranchWhereUniqueInput[]
    delete?: PlacementBranchWhereUniqueInput | PlacementBranchWhereUniqueInput[]
    connect?: PlacementBranchWhereUniqueInput | PlacementBranchWhereUniqueInput[]
    update?: PlacementBranchUpdateWithWhereUniqueWithoutBranchInput | PlacementBranchUpdateWithWhereUniqueWithoutBranchInput[]
    updateMany?: PlacementBranchUpdateManyWithWhereWithoutBranchInput | PlacementBranchUpdateManyWithWhereWithoutBranchInput[]
    deleteMany?: PlacementBranchScalarWhereInput | PlacementBranchScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutBranchNestedInput = {
    create?: XOR<UserCreateWithoutBranchInput, UserUncheckedCreateWithoutBranchInput> | UserCreateWithoutBranchInput[] | UserUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: UserCreateOrConnectWithoutBranchInput | UserCreateOrConnectWithoutBranchInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutBranchInput | UserUpsertWithWhereUniqueWithoutBranchInput[]
    createMany?: UserCreateManyBranchInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutBranchInput | UserUpdateWithWhereUniqueWithoutBranchInput[]
    updateMany?: UserUpdateManyWithWhereWithoutBranchInput | UserUpdateManyWithWhereWithoutBranchInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type PlacementBranchUncheckedUpdateManyWithoutBranchNestedInput = {
    create?: XOR<PlacementBranchCreateWithoutBranchInput, PlacementBranchUncheckedCreateWithoutBranchInput> | PlacementBranchCreateWithoutBranchInput[] | PlacementBranchUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: PlacementBranchCreateOrConnectWithoutBranchInput | PlacementBranchCreateOrConnectWithoutBranchInput[]
    upsert?: PlacementBranchUpsertWithWhereUniqueWithoutBranchInput | PlacementBranchUpsertWithWhereUniqueWithoutBranchInput[]
    createMany?: PlacementBranchCreateManyBranchInputEnvelope
    set?: PlacementBranchWhereUniqueInput | PlacementBranchWhereUniqueInput[]
    disconnect?: PlacementBranchWhereUniqueInput | PlacementBranchWhereUniqueInput[]
    delete?: PlacementBranchWhereUniqueInput | PlacementBranchWhereUniqueInput[]
    connect?: PlacementBranchWhereUniqueInput | PlacementBranchWhereUniqueInput[]
    update?: PlacementBranchUpdateWithWhereUniqueWithoutBranchInput | PlacementBranchUpdateWithWhereUniqueWithoutBranchInput[]
    updateMany?: PlacementBranchUpdateManyWithWhereWithoutBranchInput | PlacementBranchUpdateManyWithWhereWithoutBranchInput[]
    deleteMany?: PlacementBranchScalarWhereInput | PlacementBranchScalarWhereInput[]
  }

  export type StudentSkillCreateNestedManyWithoutSkillInput = {
    create?: XOR<StudentSkillCreateWithoutSkillInput, StudentSkillUncheckedCreateWithoutSkillInput> | StudentSkillCreateWithoutSkillInput[] | StudentSkillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: StudentSkillCreateOrConnectWithoutSkillInput | StudentSkillCreateOrConnectWithoutSkillInput[]
    createMany?: StudentSkillCreateManySkillInputEnvelope
    connect?: StudentSkillWhereUniqueInput | StudentSkillWhereUniqueInput[]
  }

  export type PlacementSkillCreateNestedManyWithoutSkillInput = {
    create?: XOR<PlacementSkillCreateWithoutSkillInput, PlacementSkillUncheckedCreateWithoutSkillInput> | PlacementSkillCreateWithoutSkillInput[] | PlacementSkillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: PlacementSkillCreateOrConnectWithoutSkillInput | PlacementSkillCreateOrConnectWithoutSkillInput[]
    createMany?: PlacementSkillCreateManySkillInputEnvelope
    connect?: PlacementSkillWhereUniqueInput | PlacementSkillWhereUniqueInput[]
  }

  export type StudentSkillUncheckedCreateNestedManyWithoutSkillInput = {
    create?: XOR<StudentSkillCreateWithoutSkillInput, StudentSkillUncheckedCreateWithoutSkillInput> | StudentSkillCreateWithoutSkillInput[] | StudentSkillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: StudentSkillCreateOrConnectWithoutSkillInput | StudentSkillCreateOrConnectWithoutSkillInput[]
    createMany?: StudentSkillCreateManySkillInputEnvelope
    connect?: StudentSkillWhereUniqueInput | StudentSkillWhereUniqueInput[]
  }

  export type PlacementSkillUncheckedCreateNestedManyWithoutSkillInput = {
    create?: XOR<PlacementSkillCreateWithoutSkillInput, PlacementSkillUncheckedCreateWithoutSkillInput> | PlacementSkillCreateWithoutSkillInput[] | PlacementSkillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: PlacementSkillCreateOrConnectWithoutSkillInput | PlacementSkillCreateOrConnectWithoutSkillInput[]
    createMany?: PlacementSkillCreateManySkillInputEnvelope
    connect?: PlacementSkillWhereUniqueInput | PlacementSkillWhereUniqueInput[]
  }

  export type StudentSkillUpdateManyWithoutSkillNestedInput = {
    create?: XOR<StudentSkillCreateWithoutSkillInput, StudentSkillUncheckedCreateWithoutSkillInput> | StudentSkillCreateWithoutSkillInput[] | StudentSkillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: StudentSkillCreateOrConnectWithoutSkillInput | StudentSkillCreateOrConnectWithoutSkillInput[]
    upsert?: StudentSkillUpsertWithWhereUniqueWithoutSkillInput | StudentSkillUpsertWithWhereUniqueWithoutSkillInput[]
    createMany?: StudentSkillCreateManySkillInputEnvelope
    set?: StudentSkillWhereUniqueInput | StudentSkillWhereUniqueInput[]
    disconnect?: StudentSkillWhereUniqueInput | StudentSkillWhereUniqueInput[]
    delete?: StudentSkillWhereUniqueInput | StudentSkillWhereUniqueInput[]
    connect?: StudentSkillWhereUniqueInput | StudentSkillWhereUniqueInput[]
    update?: StudentSkillUpdateWithWhereUniqueWithoutSkillInput | StudentSkillUpdateWithWhereUniqueWithoutSkillInput[]
    updateMany?: StudentSkillUpdateManyWithWhereWithoutSkillInput | StudentSkillUpdateManyWithWhereWithoutSkillInput[]
    deleteMany?: StudentSkillScalarWhereInput | StudentSkillScalarWhereInput[]
  }

  export type PlacementSkillUpdateManyWithoutSkillNestedInput = {
    create?: XOR<PlacementSkillCreateWithoutSkillInput, PlacementSkillUncheckedCreateWithoutSkillInput> | PlacementSkillCreateWithoutSkillInput[] | PlacementSkillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: PlacementSkillCreateOrConnectWithoutSkillInput | PlacementSkillCreateOrConnectWithoutSkillInput[]
    upsert?: PlacementSkillUpsertWithWhereUniqueWithoutSkillInput | PlacementSkillUpsertWithWhereUniqueWithoutSkillInput[]
    createMany?: PlacementSkillCreateManySkillInputEnvelope
    set?: PlacementSkillWhereUniqueInput | PlacementSkillWhereUniqueInput[]
    disconnect?: PlacementSkillWhereUniqueInput | PlacementSkillWhereUniqueInput[]
    delete?: PlacementSkillWhereUniqueInput | PlacementSkillWhereUniqueInput[]
    connect?: PlacementSkillWhereUniqueInput | PlacementSkillWhereUniqueInput[]
    update?: PlacementSkillUpdateWithWhereUniqueWithoutSkillInput | PlacementSkillUpdateWithWhereUniqueWithoutSkillInput[]
    updateMany?: PlacementSkillUpdateManyWithWhereWithoutSkillInput | PlacementSkillUpdateManyWithWhereWithoutSkillInput[]
    deleteMany?: PlacementSkillScalarWhereInput | PlacementSkillScalarWhereInput[]
  }

  export type StudentSkillUncheckedUpdateManyWithoutSkillNestedInput = {
    create?: XOR<StudentSkillCreateWithoutSkillInput, StudentSkillUncheckedCreateWithoutSkillInput> | StudentSkillCreateWithoutSkillInput[] | StudentSkillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: StudentSkillCreateOrConnectWithoutSkillInput | StudentSkillCreateOrConnectWithoutSkillInput[]
    upsert?: StudentSkillUpsertWithWhereUniqueWithoutSkillInput | StudentSkillUpsertWithWhereUniqueWithoutSkillInput[]
    createMany?: StudentSkillCreateManySkillInputEnvelope
    set?: StudentSkillWhereUniqueInput | StudentSkillWhereUniqueInput[]
    disconnect?: StudentSkillWhereUniqueInput | StudentSkillWhereUniqueInput[]
    delete?: StudentSkillWhereUniqueInput | StudentSkillWhereUniqueInput[]
    connect?: StudentSkillWhereUniqueInput | StudentSkillWhereUniqueInput[]
    update?: StudentSkillUpdateWithWhereUniqueWithoutSkillInput | StudentSkillUpdateWithWhereUniqueWithoutSkillInput[]
    updateMany?: StudentSkillUpdateManyWithWhereWithoutSkillInput | StudentSkillUpdateManyWithWhereWithoutSkillInput[]
    deleteMany?: StudentSkillScalarWhereInput | StudentSkillScalarWhereInput[]
  }

  export type PlacementSkillUncheckedUpdateManyWithoutSkillNestedInput = {
    create?: XOR<PlacementSkillCreateWithoutSkillInput, PlacementSkillUncheckedCreateWithoutSkillInput> | PlacementSkillCreateWithoutSkillInput[] | PlacementSkillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: PlacementSkillCreateOrConnectWithoutSkillInput | PlacementSkillCreateOrConnectWithoutSkillInput[]
    upsert?: PlacementSkillUpsertWithWhereUniqueWithoutSkillInput | PlacementSkillUpsertWithWhereUniqueWithoutSkillInput[]
    createMany?: PlacementSkillCreateManySkillInputEnvelope
    set?: PlacementSkillWhereUniqueInput | PlacementSkillWhereUniqueInput[]
    disconnect?: PlacementSkillWhereUniqueInput | PlacementSkillWhereUniqueInput[]
    delete?: PlacementSkillWhereUniqueInput | PlacementSkillWhereUniqueInput[]
    connect?: PlacementSkillWhereUniqueInput | PlacementSkillWhereUniqueInput[]
    update?: PlacementSkillUpdateWithWhereUniqueWithoutSkillInput | PlacementSkillUpdateWithWhereUniqueWithoutSkillInput[]
    updateMany?: PlacementSkillUpdateManyWithWhereWithoutSkillInput | PlacementSkillUpdateManyWithWhereWithoutSkillInput[]
    deleteMany?: PlacementSkillScalarWhereInput | PlacementSkillScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSkillsInput = {
    create?: XOR<UserCreateWithoutSkillsInput, UserUncheckedCreateWithoutSkillsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSkillsInput
    connect?: UserWhereUniqueInput
  }

  export type SkillCreateNestedOneWithoutStudentsInput = {
    create?: XOR<SkillCreateWithoutStudentsInput, SkillUncheckedCreateWithoutStudentsInput>
    connectOrCreate?: SkillCreateOrConnectWithoutStudentsInput
    connect?: SkillWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSkillsNestedInput = {
    create?: XOR<UserCreateWithoutSkillsInput, UserUncheckedCreateWithoutSkillsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSkillsInput
    upsert?: UserUpsertWithoutSkillsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSkillsInput, UserUpdateWithoutSkillsInput>, UserUncheckedUpdateWithoutSkillsInput>
  }

  export type SkillUpdateOneRequiredWithoutStudentsNestedInput = {
    create?: XOR<SkillCreateWithoutStudentsInput, SkillUncheckedCreateWithoutStudentsInput>
    connectOrCreate?: SkillCreateOrConnectWithoutStudentsInput
    upsert?: SkillUpsertWithoutStudentsInput
    connect?: SkillWhereUniqueInput
    update?: XOR<XOR<SkillUpdateToOneWithWhereWithoutStudentsInput, SkillUpdateWithoutStudentsInput>, SkillUncheckedUpdateWithoutStudentsInput>
  }

  export type PlacementCreateNestedOneWithoutSkillsInput = {
    create?: XOR<PlacementCreateWithoutSkillsInput, PlacementUncheckedCreateWithoutSkillsInput>
    connectOrCreate?: PlacementCreateOrConnectWithoutSkillsInput
    connect?: PlacementWhereUniqueInput
  }

  export type SkillCreateNestedOneWithoutPlacementsInput = {
    create?: XOR<SkillCreateWithoutPlacementsInput, SkillUncheckedCreateWithoutPlacementsInput>
    connectOrCreate?: SkillCreateOrConnectWithoutPlacementsInput
    connect?: SkillWhereUniqueInput
  }

  export type PlacementUpdateOneRequiredWithoutSkillsNestedInput = {
    create?: XOR<PlacementCreateWithoutSkillsInput, PlacementUncheckedCreateWithoutSkillsInput>
    connectOrCreate?: PlacementCreateOrConnectWithoutSkillsInput
    upsert?: PlacementUpsertWithoutSkillsInput
    connect?: PlacementWhereUniqueInput
    update?: XOR<XOR<PlacementUpdateToOneWithWhereWithoutSkillsInput, PlacementUpdateWithoutSkillsInput>, PlacementUncheckedUpdateWithoutSkillsInput>
  }

  export type SkillUpdateOneRequiredWithoutPlacementsNestedInput = {
    create?: XOR<SkillCreateWithoutPlacementsInput, SkillUncheckedCreateWithoutPlacementsInput>
    connectOrCreate?: SkillCreateOrConnectWithoutPlacementsInput
    upsert?: SkillUpsertWithoutPlacementsInput
    connect?: SkillWhereUniqueInput
    update?: XOR<XOR<SkillUpdateToOneWithWhereWithoutPlacementsInput, SkillUpdateWithoutPlacementsInput>, SkillUncheckedUpdateWithoutPlacementsInput>
  }

  export type PlacementCreateNestedOneWithoutBranchesInput = {
    create?: XOR<PlacementCreateWithoutBranchesInput, PlacementUncheckedCreateWithoutBranchesInput>
    connectOrCreate?: PlacementCreateOrConnectWithoutBranchesInput
    connect?: PlacementWhereUniqueInput
  }

  export type BranchCreateNestedOneWithoutPlacementsInput = {
    create?: XOR<BranchCreateWithoutPlacementsInput, BranchUncheckedCreateWithoutPlacementsInput>
    connectOrCreate?: BranchCreateOrConnectWithoutPlacementsInput
    connect?: BranchWhereUniqueInput
  }

  export type PlacementUpdateOneRequiredWithoutBranchesNestedInput = {
    create?: XOR<PlacementCreateWithoutBranchesInput, PlacementUncheckedCreateWithoutBranchesInput>
    connectOrCreate?: PlacementCreateOrConnectWithoutBranchesInput
    upsert?: PlacementUpsertWithoutBranchesInput
    connect?: PlacementWhereUniqueInput
    update?: XOR<XOR<PlacementUpdateToOneWithWhereWithoutBranchesInput, PlacementUpdateWithoutBranchesInput>, PlacementUncheckedUpdateWithoutBranchesInput>
  }

  export type BranchUpdateOneRequiredWithoutPlacementsNestedInput = {
    create?: XOR<BranchCreateWithoutPlacementsInput, BranchUncheckedCreateWithoutPlacementsInput>
    connectOrCreate?: BranchCreateOrConnectWithoutPlacementsInput
    upsert?: BranchUpsertWithoutPlacementsInput
    connect?: BranchWhereUniqueInput
    update?: XOR<XOR<BranchUpdateToOneWithWhereWithoutPlacementsInput, BranchUpdateWithoutPlacementsInput>, BranchUncheckedUpdateWithoutPlacementsInput>
  }

  export type PlacementCreateNestedOneWithoutAttachmentsInput = {
    create?: XOR<PlacementCreateWithoutAttachmentsInput, PlacementUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: PlacementCreateOrConnectWithoutAttachmentsInput
    connect?: PlacementWhereUniqueInput
  }

  export type PlacementChunkCreateNestedManyWithoutAttachmentInput = {
    create?: XOR<PlacementChunkCreateWithoutAttachmentInput, PlacementChunkUncheckedCreateWithoutAttachmentInput> | PlacementChunkCreateWithoutAttachmentInput[] | PlacementChunkUncheckedCreateWithoutAttachmentInput[]
    connectOrCreate?: PlacementChunkCreateOrConnectWithoutAttachmentInput | PlacementChunkCreateOrConnectWithoutAttachmentInput[]
    createMany?: PlacementChunkCreateManyAttachmentInputEnvelope
    connect?: PlacementChunkWhereUniqueInput | PlacementChunkWhereUniqueInput[]
  }

  export type PlacementChunkUncheckedCreateNestedManyWithoutAttachmentInput = {
    create?: XOR<PlacementChunkCreateWithoutAttachmentInput, PlacementChunkUncheckedCreateWithoutAttachmentInput> | PlacementChunkCreateWithoutAttachmentInput[] | PlacementChunkUncheckedCreateWithoutAttachmentInput[]
    connectOrCreate?: PlacementChunkCreateOrConnectWithoutAttachmentInput | PlacementChunkCreateOrConnectWithoutAttachmentInput[]
    createMany?: PlacementChunkCreateManyAttachmentInputEnvelope
    connect?: PlacementChunkWhereUniqueInput | PlacementChunkWhereUniqueInput[]
  }

  export type PlacementUpdateOneRequiredWithoutAttachmentsNestedInput = {
    create?: XOR<PlacementCreateWithoutAttachmentsInput, PlacementUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: PlacementCreateOrConnectWithoutAttachmentsInput
    upsert?: PlacementUpsertWithoutAttachmentsInput
    connect?: PlacementWhereUniqueInput
    update?: XOR<XOR<PlacementUpdateToOneWithWhereWithoutAttachmentsInput, PlacementUpdateWithoutAttachmentsInput>, PlacementUncheckedUpdateWithoutAttachmentsInput>
  }

  export type PlacementChunkUpdateManyWithoutAttachmentNestedInput = {
    create?: XOR<PlacementChunkCreateWithoutAttachmentInput, PlacementChunkUncheckedCreateWithoutAttachmentInput> | PlacementChunkCreateWithoutAttachmentInput[] | PlacementChunkUncheckedCreateWithoutAttachmentInput[]
    connectOrCreate?: PlacementChunkCreateOrConnectWithoutAttachmentInput | PlacementChunkCreateOrConnectWithoutAttachmentInput[]
    upsert?: PlacementChunkUpsertWithWhereUniqueWithoutAttachmentInput | PlacementChunkUpsertWithWhereUniqueWithoutAttachmentInput[]
    createMany?: PlacementChunkCreateManyAttachmentInputEnvelope
    set?: PlacementChunkWhereUniqueInput | PlacementChunkWhereUniqueInput[]
    disconnect?: PlacementChunkWhereUniqueInput | PlacementChunkWhereUniqueInput[]
    delete?: PlacementChunkWhereUniqueInput | PlacementChunkWhereUniqueInput[]
    connect?: PlacementChunkWhereUniqueInput | PlacementChunkWhereUniqueInput[]
    update?: PlacementChunkUpdateWithWhereUniqueWithoutAttachmentInput | PlacementChunkUpdateWithWhereUniqueWithoutAttachmentInput[]
    updateMany?: PlacementChunkUpdateManyWithWhereWithoutAttachmentInput | PlacementChunkUpdateManyWithWhereWithoutAttachmentInput[]
    deleteMany?: PlacementChunkScalarWhereInput | PlacementChunkScalarWhereInput[]
  }

  export type PlacementChunkUncheckedUpdateManyWithoutAttachmentNestedInput = {
    create?: XOR<PlacementChunkCreateWithoutAttachmentInput, PlacementChunkUncheckedCreateWithoutAttachmentInput> | PlacementChunkCreateWithoutAttachmentInput[] | PlacementChunkUncheckedCreateWithoutAttachmentInput[]
    connectOrCreate?: PlacementChunkCreateOrConnectWithoutAttachmentInput | PlacementChunkCreateOrConnectWithoutAttachmentInput[]
    upsert?: PlacementChunkUpsertWithWhereUniqueWithoutAttachmentInput | PlacementChunkUpsertWithWhereUniqueWithoutAttachmentInput[]
    createMany?: PlacementChunkCreateManyAttachmentInputEnvelope
    set?: PlacementChunkWhereUniqueInput | PlacementChunkWhereUniqueInput[]
    disconnect?: PlacementChunkWhereUniqueInput | PlacementChunkWhereUniqueInput[]
    delete?: PlacementChunkWhereUniqueInput | PlacementChunkWhereUniqueInput[]
    connect?: PlacementChunkWhereUniqueInput | PlacementChunkWhereUniqueInput[]
    update?: PlacementChunkUpdateWithWhereUniqueWithoutAttachmentInput | PlacementChunkUpdateWithWhereUniqueWithoutAttachmentInput[]
    updateMany?: PlacementChunkUpdateManyWithWhereWithoutAttachmentInput | PlacementChunkUpdateManyWithWhereWithoutAttachmentInput[]
    deleteMany?: PlacementChunkScalarWhereInput | PlacementChunkScalarWhereInput[]
  }

  export type AttachmentCreateNestedOneWithoutChunksInput = {
    create?: XOR<AttachmentCreateWithoutChunksInput, AttachmentUncheckedCreateWithoutChunksInput>
    connectOrCreate?: AttachmentCreateOrConnectWithoutChunksInput
    connect?: AttachmentWhereUniqueInput
  }

  export type AttachmentUpdateOneRequiredWithoutChunksNestedInput = {
    create?: XOR<AttachmentCreateWithoutChunksInput, AttachmentUncheckedCreateWithoutChunksInput>
    connectOrCreate?: AttachmentCreateOrConnectWithoutChunksInput
    upsert?: AttachmentUpsertWithoutChunksInput
    connect?: AttachmentWhereUniqueInput
    update?: XOR<XOR<AttachmentUpdateToOneWithWhereWithoutChunksInput, AttachmentUpdateWithoutChunksInput>, AttachmentUncheckedUpdateWithoutChunksInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumInstituteNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Institute | EnumInstituteFieldRefInput<$PrismaModel> | null
    in?: $Enums.Institute[] | ListEnumInstituteFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Institute[] | ListEnumInstituteFieldRefInput<$PrismaModel> | null
    not?: NestedEnumInstituteNullableFilter<$PrismaModel> | $Enums.Institute | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumInstituteNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Institute | EnumInstituteFieldRefInput<$PrismaModel> | null
    in?: $Enums.Institute[] | ListEnumInstituteFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Institute[] | ListEnumInstituteFieldRefInput<$PrismaModel> | null
    not?: NestedEnumInstituteNullableWithAggregatesFilter<$PrismaModel> | $Enums.Institute | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumInstituteNullableFilter<$PrismaModel>
    _max?: NestedEnumInstituteNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BranchCreateWithoutUsersInput = {
    name: string
    placements?: PlacementBranchCreateNestedManyWithoutBranchInput
  }

  export type BranchUncheckedCreateWithoutUsersInput = {
    id?: number
    name: string
    placements?: PlacementBranchUncheckedCreateNestedManyWithoutBranchInput
  }

  export type BranchCreateOrConnectWithoutUsersInput = {
    where: BranchWhereUniqueInput
    create: XOR<BranchCreateWithoutUsersInput, BranchUncheckedCreateWithoutUsersInput>
  }

  export type StudentSkillCreateWithoutUserInput = {
    skill: SkillCreateNestedOneWithoutStudentsInput
  }

  export type StudentSkillUncheckedCreateWithoutUserInput = {
    skillId: number
  }

  export type StudentSkillCreateOrConnectWithoutUserInput = {
    where: StudentSkillWhereUniqueInput
    create: XOR<StudentSkillCreateWithoutUserInput, StudentSkillUncheckedCreateWithoutUserInput>
  }

  export type StudentSkillCreateManyUserInputEnvelope = {
    data: StudentSkillCreateManyUserInput | StudentSkillCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BranchUpsertWithoutUsersInput = {
    update: XOR<BranchUpdateWithoutUsersInput, BranchUncheckedUpdateWithoutUsersInput>
    create: XOR<BranchCreateWithoutUsersInput, BranchUncheckedCreateWithoutUsersInput>
    where?: BranchWhereInput
  }

  export type BranchUpdateToOneWithWhereWithoutUsersInput = {
    where?: BranchWhereInput
    data: XOR<BranchUpdateWithoutUsersInput, BranchUncheckedUpdateWithoutUsersInput>
  }

  export type BranchUpdateWithoutUsersInput = {
    name?: StringFieldUpdateOperationsInput | string
    placements?: PlacementBranchUpdateManyWithoutBranchNestedInput
  }

  export type BranchUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    placements?: PlacementBranchUncheckedUpdateManyWithoutBranchNestedInput
  }

  export type StudentSkillUpsertWithWhereUniqueWithoutUserInput = {
    where: StudentSkillWhereUniqueInput
    update: XOR<StudentSkillUpdateWithoutUserInput, StudentSkillUncheckedUpdateWithoutUserInput>
    create: XOR<StudentSkillCreateWithoutUserInput, StudentSkillUncheckedCreateWithoutUserInput>
  }

  export type StudentSkillUpdateWithWhereUniqueWithoutUserInput = {
    where: StudentSkillWhereUniqueInput
    data: XOR<StudentSkillUpdateWithoutUserInput, StudentSkillUncheckedUpdateWithoutUserInput>
  }

  export type StudentSkillUpdateManyWithWhereWithoutUserInput = {
    where: StudentSkillScalarWhereInput
    data: XOR<StudentSkillUpdateManyMutationInput, StudentSkillUncheckedUpdateManyWithoutUserInput>
  }

  export type StudentSkillScalarWhereInput = {
    AND?: StudentSkillScalarWhereInput | StudentSkillScalarWhereInput[]
    OR?: StudentSkillScalarWhereInput[]
    NOT?: StudentSkillScalarWhereInput | StudentSkillScalarWhereInput[]
    userId?: IntFilter<"StudentSkill"> | number
    skillId?: IntFilter<"StudentSkill"> | number
  }

  export type PlacementCreateWithoutCompanyInput = {
    position: string
    ctc: number
    deadline: Date | string
    cgpaCutoff: number
    description?: string | null
    status?: string
    activeRound?: string
    appliedCount?: number
    shortlistedCount?: number
    offeredCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    skills?: PlacementSkillCreateNestedManyWithoutPlacementInput
    branches?: PlacementBranchCreateNestedManyWithoutPlacementInput
    attachments?: AttachmentCreateNestedManyWithoutPlacementInput
  }

  export type PlacementUncheckedCreateWithoutCompanyInput = {
    id?: number
    position: string
    ctc: number
    deadline: Date | string
    cgpaCutoff: number
    description?: string | null
    status?: string
    activeRound?: string
    appliedCount?: number
    shortlistedCount?: number
    offeredCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    skills?: PlacementSkillUncheckedCreateNestedManyWithoutPlacementInput
    branches?: PlacementBranchUncheckedCreateNestedManyWithoutPlacementInput
    attachments?: AttachmentUncheckedCreateNestedManyWithoutPlacementInput
  }

  export type PlacementCreateOrConnectWithoutCompanyInput = {
    where: PlacementWhereUniqueInput
    create: XOR<PlacementCreateWithoutCompanyInput, PlacementUncheckedCreateWithoutCompanyInput>
  }

  export type PlacementCreateManyCompanyInputEnvelope = {
    data: PlacementCreateManyCompanyInput | PlacementCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type PlacementUpsertWithWhereUniqueWithoutCompanyInput = {
    where: PlacementWhereUniqueInput
    update: XOR<PlacementUpdateWithoutCompanyInput, PlacementUncheckedUpdateWithoutCompanyInput>
    create: XOR<PlacementCreateWithoutCompanyInput, PlacementUncheckedCreateWithoutCompanyInput>
  }

  export type PlacementUpdateWithWhereUniqueWithoutCompanyInput = {
    where: PlacementWhereUniqueInput
    data: XOR<PlacementUpdateWithoutCompanyInput, PlacementUncheckedUpdateWithoutCompanyInput>
  }

  export type PlacementUpdateManyWithWhereWithoutCompanyInput = {
    where: PlacementScalarWhereInput
    data: XOR<PlacementUpdateManyMutationInput, PlacementUncheckedUpdateManyWithoutCompanyInput>
  }

  export type PlacementScalarWhereInput = {
    AND?: PlacementScalarWhereInput | PlacementScalarWhereInput[]
    OR?: PlacementScalarWhereInput[]
    NOT?: PlacementScalarWhereInput | PlacementScalarWhereInput[]
    id?: IntFilter<"Placement"> | number
    companyId?: IntFilter<"Placement"> | number
    position?: StringFilter<"Placement"> | string
    ctc?: FloatFilter<"Placement"> | number
    deadline?: DateTimeFilter<"Placement"> | Date | string
    cgpaCutoff?: FloatFilter<"Placement"> | number
    description?: StringNullableFilter<"Placement"> | string | null
    status?: StringFilter<"Placement"> | string
    activeRound?: StringFilter<"Placement"> | string
    appliedCount?: IntFilter<"Placement"> | number
    shortlistedCount?: IntFilter<"Placement"> | number
    offeredCount?: IntFilter<"Placement"> | number
    createdAt?: DateTimeFilter<"Placement"> | Date | string
    updatedAt?: DateTimeFilter<"Placement"> | Date | string
  }

  export type CompanyCreateWithoutPlacementsInput = {
    name: string
    sector: string
    hiresDepstar?: number
    hiresCspit?: number
    status?: string
    avgPackage: number
    notes?: string | null
    website?: string | null
    hrContacts?: NullableJsonNullValueInput | InputJsonValue
    visits?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompanyUncheckedCreateWithoutPlacementsInput = {
    id?: number
    name: string
    sector: string
    hiresDepstar?: number
    hiresCspit?: number
    status?: string
    avgPackage: number
    notes?: string | null
    website?: string | null
    hrContacts?: NullableJsonNullValueInput | InputJsonValue
    visits?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompanyCreateOrConnectWithoutPlacementsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutPlacementsInput, CompanyUncheckedCreateWithoutPlacementsInput>
  }

  export type PlacementSkillCreateWithoutPlacementInput = {
    skill: SkillCreateNestedOneWithoutPlacementsInput
  }

  export type PlacementSkillUncheckedCreateWithoutPlacementInput = {
    skillId: number
  }

  export type PlacementSkillCreateOrConnectWithoutPlacementInput = {
    where: PlacementSkillWhereUniqueInput
    create: XOR<PlacementSkillCreateWithoutPlacementInput, PlacementSkillUncheckedCreateWithoutPlacementInput>
  }

  export type PlacementSkillCreateManyPlacementInputEnvelope = {
    data: PlacementSkillCreateManyPlacementInput | PlacementSkillCreateManyPlacementInput[]
    skipDuplicates?: boolean
  }

  export type PlacementBranchCreateWithoutPlacementInput = {
    branch: BranchCreateNestedOneWithoutPlacementsInput
  }

  export type PlacementBranchUncheckedCreateWithoutPlacementInput = {
    branchId: number
  }

  export type PlacementBranchCreateOrConnectWithoutPlacementInput = {
    where: PlacementBranchWhereUniqueInput
    create: XOR<PlacementBranchCreateWithoutPlacementInput, PlacementBranchUncheckedCreateWithoutPlacementInput>
  }

  export type PlacementBranchCreateManyPlacementInputEnvelope = {
    data: PlacementBranchCreateManyPlacementInput | PlacementBranchCreateManyPlacementInput[]
    skipDuplicates?: boolean
  }

  export type AttachmentCreateWithoutPlacementInput = {
    filePath: string
    fileType: string
    chunks?: PlacementChunkCreateNestedManyWithoutAttachmentInput
  }

  export type AttachmentUncheckedCreateWithoutPlacementInput = {
    id?: number
    filePath: string
    fileType: string
    chunks?: PlacementChunkUncheckedCreateNestedManyWithoutAttachmentInput
  }

  export type AttachmentCreateOrConnectWithoutPlacementInput = {
    where: AttachmentWhereUniqueInput
    create: XOR<AttachmentCreateWithoutPlacementInput, AttachmentUncheckedCreateWithoutPlacementInput>
  }

  export type AttachmentCreateManyPlacementInputEnvelope = {
    data: AttachmentCreateManyPlacementInput | AttachmentCreateManyPlacementInput[]
    skipDuplicates?: boolean
  }

  export type CompanyUpsertWithoutPlacementsInput = {
    update: XOR<CompanyUpdateWithoutPlacementsInput, CompanyUncheckedUpdateWithoutPlacementsInput>
    create: XOR<CompanyCreateWithoutPlacementsInput, CompanyUncheckedCreateWithoutPlacementsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutPlacementsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutPlacementsInput, CompanyUncheckedUpdateWithoutPlacementsInput>
  }

  export type CompanyUpdateWithoutPlacementsInput = {
    name?: StringFieldUpdateOperationsInput | string
    sector?: StringFieldUpdateOperationsInput | string
    hiresDepstar?: IntFieldUpdateOperationsInput | number
    hiresCspit?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    avgPackage?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    hrContacts?: NullableJsonNullValueInput | InputJsonValue
    visits?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyUncheckedUpdateWithoutPlacementsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    sector?: StringFieldUpdateOperationsInput | string
    hiresDepstar?: IntFieldUpdateOperationsInput | number
    hiresCspit?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    avgPackage?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    hrContacts?: NullableJsonNullValueInput | InputJsonValue
    visits?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlacementSkillUpsertWithWhereUniqueWithoutPlacementInput = {
    where: PlacementSkillWhereUniqueInput
    update: XOR<PlacementSkillUpdateWithoutPlacementInput, PlacementSkillUncheckedUpdateWithoutPlacementInput>
    create: XOR<PlacementSkillCreateWithoutPlacementInput, PlacementSkillUncheckedCreateWithoutPlacementInput>
  }

  export type PlacementSkillUpdateWithWhereUniqueWithoutPlacementInput = {
    where: PlacementSkillWhereUniqueInput
    data: XOR<PlacementSkillUpdateWithoutPlacementInput, PlacementSkillUncheckedUpdateWithoutPlacementInput>
  }

  export type PlacementSkillUpdateManyWithWhereWithoutPlacementInput = {
    where: PlacementSkillScalarWhereInput
    data: XOR<PlacementSkillUpdateManyMutationInput, PlacementSkillUncheckedUpdateManyWithoutPlacementInput>
  }

  export type PlacementSkillScalarWhereInput = {
    AND?: PlacementSkillScalarWhereInput | PlacementSkillScalarWhereInput[]
    OR?: PlacementSkillScalarWhereInput[]
    NOT?: PlacementSkillScalarWhereInput | PlacementSkillScalarWhereInput[]
    placementId?: IntFilter<"PlacementSkill"> | number
    skillId?: IntFilter<"PlacementSkill"> | number
  }

  export type PlacementBranchUpsertWithWhereUniqueWithoutPlacementInput = {
    where: PlacementBranchWhereUniqueInput
    update: XOR<PlacementBranchUpdateWithoutPlacementInput, PlacementBranchUncheckedUpdateWithoutPlacementInput>
    create: XOR<PlacementBranchCreateWithoutPlacementInput, PlacementBranchUncheckedCreateWithoutPlacementInput>
  }

  export type PlacementBranchUpdateWithWhereUniqueWithoutPlacementInput = {
    where: PlacementBranchWhereUniqueInput
    data: XOR<PlacementBranchUpdateWithoutPlacementInput, PlacementBranchUncheckedUpdateWithoutPlacementInput>
  }

  export type PlacementBranchUpdateManyWithWhereWithoutPlacementInput = {
    where: PlacementBranchScalarWhereInput
    data: XOR<PlacementBranchUpdateManyMutationInput, PlacementBranchUncheckedUpdateManyWithoutPlacementInput>
  }

  export type PlacementBranchScalarWhereInput = {
    AND?: PlacementBranchScalarWhereInput | PlacementBranchScalarWhereInput[]
    OR?: PlacementBranchScalarWhereInput[]
    NOT?: PlacementBranchScalarWhereInput | PlacementBranchScalarWhereInput[]
    placementId?: IntFilter<"PlacementBranch"> | number
    branchId?: IntFilter<"PlacementBranch"> | number
  }

  export type AttachmentUpsertWithWhereUniqueWithoutPlacementInput = {
    where: AttachmentWhereUniqueInput
    update: XOR<AttachmentUpdateWithoutPlacementInput, AttachmentUncheckedUpdateWithoutPlacementInput>
    create: XOR<AttachmentCreateWithoutPlacementInput, AttachmentUncheckedCreateWithoutPlacementInput>
  }

  export type AttachmentUpdateWithWhereUniqueWithoutPlacementInput = {
    where: AttachmentWhereUniqueInput
    data: XOR<AttachmentUpdateWithoutPlacementInput, AttachmentUncheckedUpdateWithoutPlacementInput>
  }

  export type AttachmentUpdateManyWithWhereWithoutPlacementInput = {
    where: AttachmentScalarWhereInput
    data: XOR<AttachmentUpdateManyMutationInput, AttachmentUncheckedUpdateManyWithoutPlacementInput>
  }

  export type AttachmentScalarWhereInput = {
    AND?: AttachmentScalarWhereInput | AttachmentScalarWhereInput[]
    OR?: AttachmentScalarWhereInput[]
    NOT?: AttachmentScalarWhereInput | AttachmentScalarWhereInput[]
    id?: IntFilter<"Attachment"> | number
    placementId?: IntFilter<"Attachment"> | number
    filePath?: StringFilter<"Attachment"> | string
    fileType?: StringFilter<"Attachment"> | string
  }

  export type UserCreateWithoutBranchInput = {
    email: string
    passwordHash: string
    role?: $Enums.Role
    name: string
    rollNo?: string | null
    cgpa?: number | null
    institute?: $Enums.Institute | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    skills?: StudentSkillCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBranchInput = {
    id?: number
    email: string
    passwordHash: string
    role?: $Enums.Role
    name: string
    rollNo?: string | null
    cgpa?: number | null
    institute?: $Enums.Institute | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    skills?: StudentSkillUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBranchInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBranchInput, UserUncheckedCreateWithoutBranchInput>
  }

  export type UserCreateManyBranchInputEnvelope = {
    data: UserCreateManyBranchInput | UserCreateManyBranchInput[]
    skipDuplicates?: boolean
  }

  export type PlacementBranchCreateWithoutBranchInput = {
    placement: PlacementCreateNestedOneWithoutBranchesInput
  }

  export type PlacementBranchUncheckedCreateWithoutBranchInput = {
    placementId: number
  }

  export type PlacementBranchCreateOrConnectWithoutBranchInput = {
    where: PlacementBranchWhereUniqueInput
    create: XOR<PlacementBranchCreateWithoutBranchInput, PlacementBranchUncheckedCreateWithoutBranchInput>
  }

  export type PlacementBranchCreateManyBranchInputEnvelope = {
    data: PlacementBranchCreateManyBranchInput | PlacementBranchCreateManyBranchInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutBranchInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutBranchInput, UserUncheckedUpdateWithoutBranchInput>
    create: XOR<UserCreateWithoutBranchInput, UserUncheckedCreateWithoutBranchInput>
  }

  export type UserUpdateWithWhereUniqueWithoutBranchInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutBranchInput, UserUncheckedUpdateWithoutBranchInput>
  }

  export type UserUpdateManyWithWhereWithoutBranchInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutBranchInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    name?: StringFilter<"User"> | string
    rollNo?: StringNullableFilter<"User"> | string | null
    cgpa?: FloatNullableFilter<"User"> | number | null
    institute?: EnumInstituteNullableFilter<"User"> | $Enums.Institute | null
    phone?: StringNullableFilter<"User"> | string | null
    branchId?: IntNullableFilter<"User"> | number | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type PlacementBranchUpsertWithWhereUniqueWithoutBranchInput = {
    where: PlacementBranchWhereUniqueInput
    update: XOR<PlacementBranchUpdateWithoutBranchInput, PlacementBranchUncheckedUpdateWithoutBranchInput>
    create: XOR<PlacementBranchCreateWithoutBranchInput, PlacementBranchUncheckedCreateWithoutBranchInput>
  }

  export type PlacementBranchUpdateWithWhereUniqueWithoutBranchInput = {
    where: PlacementBranchWhereUniqueInput
    data: XOR<PlacementBranchUpdateWithoutBranchInput, PlacementBranchUncheckedUpdateWithoutBranchInput>
  }

  export type PlacementBranchUpdateManyWithWhereWithoutBranchInput = {
    where: PlacementBranchScalarWhereInput
    data: XOR<PlacementBranchUpdateManyMutationInput, PlacementBranchUncheckedUpdateManyWithoutBranchInput>
  }

  export type StudentSkillCreateWithoutSkillInput = {
    user: UserCreateNestedOneWithoutSkillsInput
  }

  export type StudentSkillUncheckedCreateWithoutSkillInput = {
    userId: number
  }

  export type StudentSkillCreateOrConnectWithoutSkillInput = {
    where: StudentSkillWhereUniqueInput
    create: XOR<StudentSkillCreateWithoutSkillInput, StudentSkillUncheckedCreateWithoutSkillInput>
  }

  export type StudentSkillCreateManySkillInputEnvelope = {
    data: StudentSkillCreateManySkillInput | StudentSkillCreateManySkillInput[]
    skipDuplicates?: boolean
  }

  export type PlacementSkillCreateWithoutSkillInput = {
    placement: PlacementCreateNestedOneWithoutSkillsInput
  }

  export type PlacementSkillUncheckedCreateWithoutSkillInput = {
    placementId: number
  }

  export type PlacementSkillCreateOrConnectWithoutSkillInput = {
    where: PlacementSkillWhereUniqueInput
    create: XOR<PlacementSkillCreateWithoutSkillInput, PlacementSkillUncheckedCreateWithoutSkillInput>
  }

  export type PlacementSkillCreateManySkillInputEnvelope = {
    data: PlacementSkillCreateManySkillInput | PlacementSkillCreateManySkillInput[]
    skipDuplicates?: boolean
  }

  export type StudentSkillUpsertWithWhereUniqueWithoutSkillInput = {
    where: StudentSkillWhereUniqueInput
    update: XOR<StudentSkillUpdateWithoutSkillInput, StudentSkillUncheckedUpdateWithoutSkillInput>
    create: XOR<StudentSkillCreateWithoutSkillInput, StudentSkillUncheckedCreateWithoutSkillInput>
  }

  export type StudentSkillUpdateWithWhereUniqueWithoutSkillInput = {
    where: StudentSkillWhereUniqueInput
    data: XOR<StudentSkillUpdateWithoutSkillInput, StudentSkillUncheckedUpdateWithoutSkillInput>
  }

  export type StudentSkillUpdateManyWithWhereWithoutSkillInput = {
    where: StudentSkillScalarWhereInput
    data: XOR<StudentSkillUpdateManyMutationInput, StudentSkillUncheckedUpdateManyWithoutSkillInput>
  }

  export type PlacementSkillUpsertWithWhereUniqueWithoutSkillInput = {
    where: PlacementSkillWhereUniqueInput
    update: XOR<PlacementSkillUpdateWithoutSkillInput, PlacementSkillUncheckedUpdateWithoutSkillInput>
    create: XOR<PlacementSkillCreateWithoutSkillInput, PlacementSkillUncheckedCreateWithoutSkillInput>
  }

  export type PlacementSkillUpdateWithWhereUniqueWithoutSkillInput = {
    where: PlacementSkillWhereUniqueInput
    data: XOR<PlacementSkillUpdateWithoutSkillInput, PlacementSkillUncheckedUpdateWithoutSkillInput>
  }

  export type PlacementSkillUpdateManyWithWhereWithoutSkillInput = {
    where: PlacementSkillScalarWhereInput
    data: XOR<PlacementSkillUpdateManyMutationInput, PlacementSkillUncheckedUpdateManyWithoutSkillInput>
  }

  export type UserCreateWithoutSkillsInput = {
    email: string
    passwordHash: string
    role?: $Enums.Role
    name: string
    rollNo?: string | null
    cgpa?: number | null
    institute?: $Enums.Institute | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    branch?: BranchCreateNestedOneWithoutUsersInput
  }

  export type UserUncheckedCreateWithoutSkillsInput = {
    id?: number
    email: string
    passwordHash: string
    role?: $Enums.Role
    name: string
    rollNo?: string | null
    cgpa?: number | null
    institute?: $Enums.Institute | null
    phone?: string | null
    branchId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutSkillsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSkillsInput, UserUncheckedCreateWithoutSkillsInput>
  }

  export type SkillCreateWithoutStudentsInput = {
    name: string
    placements?: PlacementSkillCreateNestedManyWithoutSkillInput
  }

  export type SkillUncheckedCreateWithoutStudentsInput = {
    id?: number
    name: string
    placements?: PlacementSkillUncheckedCreateNestedManyWithoutSkillInput
  }

  export type SkillCreateOrConnectWithoutStudentsInput = {
    where: SkillWhereUniqueInput
    create: XOR<SkillCreateWithoutStudentsInput, SkillUncheckedCreateWithoutStudentsInput>
  }

  export type UserUpsertWithoutSkillsInput = {
    update: XOR<UserUpdateWithoutSkillsInput, UserUncheckedUpdateWithoutSkillsInput>
    create: XOR<UserCreateWithoutSkillsInput, UserUncheckedCreateWithoutSkillsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSkillsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSkillsInput, UserUncheckedUpdateWithoutSkillsInput>
  }

  export type UserUpdateWithoutSkillsInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    rollNo?: NullableStringFieldUpdateOperationsInput | string | null
    cgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    institute?: NullableEnumInstituteFieldUpdateOperationsInput | $Enums.Institute | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    branch?: BranchUpdateOneWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateWithoutSkillsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    rollNo?: NullableStringFieldUpdateOperationsInput | string | null
    cgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    institute?: NullableEnumInstituteFieldUpdateOperationsInput | $Enums.Institute | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    branchId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkillUpsertWithoutStudentsInput = {
    update: XOR<SkillUpdateWithoutStudentsInput, SkillUncheckedUpdateWithoutStudentsInput>
    create: XOR<SkillCreateWithoutStudentsInput, SkillUncheckedCreateWithoutStudentsInput>
    where?: SkillWhereInput
  }

  export type SkillUpdateToOneWithWhereWithoutStudentsInput = {
    where?: SkillWhereInput
    data: XOR<SkillUpdateWithoutStudentsInput, SkillUncheckedUpdateWithoutStudentsInput>
  }

  export type SkillUpdateWithoutStudentsInput = {
    name?: StringFieldUpdateOperationsInput | string
    placements?: PlacementSkillUpdateManyWithoutSkillNestedInput
  }

  export type SkillUncheckedUpdateWithoutStudentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    placements?: PlacementSkillUncheckedUpdateManyWithoutSkillNestedInput
  }

  export type PlacementCreateWithoutSkillsInput = {
    position: string
    ctc: number
    deadline: Date | string
    cgpaCutoff: number
    description?: string | null
    status?: string
    activeRound?: string
    appliedCount?: number
    shortlistedCount?: number
    offeredCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutPlacementsInput
    branches?: PlacementBranchCreateNestedManyWithoutPlacementInput
    attachments?: AttachmentCreateNestedManyWithoutPlacementInput
  }

  export type PlacementUncheckedCreateWithoutSkillsInput = {
    id?: number
    companyId: number
    position: string
    ctc: number
    deadline: Date | string
    cgpaCutoff: number
    description?: string | null
    status?: string
    activeRound?: string
    appliedCount?: number
    shortlistedCount?: number
    offeredCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    branches?: PlacementBranchUncheckedCreateNestedManyWithoutPlacementInput
    attachments?: AttachmentUncheckedCreateNestedManyWithoutPlacementInput
  }

  export type PlacementCreateOrConnectWithoutSkillsInput = {
    where: PlacementWhereUniqueInput
    create: XOR<PlacementCreateWithoutSkillsInput, PlacementUncheckedCreateWithoutSkillsInput>
  }

  export type SkillCreateWithoutPlacementsInput = {
    name: string
    students?: StudentSkillCreateNestedManyWithoutSkillInput
  }

  export type SkillUncheckedCreateWithoutPlacementsInput = {
    id?: number
    name: string
    students?: StudentSkillUncheckedCreateNestedManyWithoutSkillInput
  }

  export type SkillCreateOrConnectWithoutPlacementsInput = {
    where: SkillWhereUniqueInput
    create: XOR<SkillCreateWithoutPlacementsInput, SkillUncheckedCreateWithoutPlacementsInput>
  }

  export type PlacementUpsertWithoutSkillsInput = {
    update: XOR<PlacementUpdateWithoutSkillsInput, PlacementUncheckedUpdateWithoutSkillsInput>
    create: XOR<PlacementCreateWithoutSkillsInput, PlacementUncheckedCreateWithoutSkillsInput>
    where?: PlacementWhereInput
  }

  export type PlacementUpdateToOneWithWhereWithoutSkillsInput = {
    where?: PlacementWhereInput
    data: XOR<PlacementUpdateWithoutSkillsInput, PlacementUncheckedUpdateWithoutSkillsInput>
  }

  export type PlacementUpdateWithoutSkillsInput = {
    position?: StringFieldUpdateOperationsInput | string
    ctc?: FloatFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    cgpaCutoff?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    activeRound?: StringFieldUpdateOperationsInput | string
    appliedCount?: IntFieldUpdateOperationsInput | number
    shortlistedCount?: IntFieldUpdateOperationsInput | number
    offeredCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutPlacementsNestedInput
    branches?: PlacementBranchUpdateManyWithoutPlacementNestedInput
    attachments?: AttachmentUpdateManyWithoutPlacementNestedInput
  }

  export type PlacementUncheckedUpdateWithoutSkillsInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    position?: StringFieldUpdateOperationsInput | string
    ctc?: FloatFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    cgpaCutoff?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    activeRound?: StringFieldUpdateOperationsInput | string
    appliedCount?: IntFieldUpdateOperationsInput | number
    shortlistedCount?: IntFieldUpdateOperationsInput | number
    offeredCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    branches?: PlacementBranchUncheckedUpdateManyWithoutPlacementNestedInput
    attachments?: AttachmentUncheckedUpdateManyWithoutPlacementNestedInput
  }

  export type SkillUpsertWithoutPlacementsInput = {
    update: XOR<SkillUpdateWithoutPlacementsInput, SkillUncheckedUpdateWithoutPlacementsInput>
    create: XOR<SkillCreateWithoutPlacementsInput, SkillUncheckedCreateWithoutPlacementsInput>
    where?: SkillWhereInput
  }

  export type SkillUpdateToOneWithWhereWithoutPlacementsInput = {
    where?: SkillWhereInput
    data: XOR<SkillUpdateWithoutPlacementsInput, SkillUncheckedUpdateWithoutPlacementsInput>
  }

  export type SkillUpdateWithoutPlacementsInput = {
    name?: StringFieldUpdateOperationsInput | string
    students?: StudentSkillUpdateManyWithoutSkillNestedInput
  }

  export type SkillUncheckedUpdateWithoutPlacementsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    students?: StudentSkillUncheckedUpdateManyWithoutSkillNestedInput
  }

  export type PlacementCreateWithoutBranchesInput = {
    position: string
    ctc: number
    deadline: Date | string
    cgpaCutoff: number
    description?: string | null
    status?: string
    activeRound?: string
    appliedCount?: number
    shortlistedCount?: number
    offeredCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutPlacementsInput
    skills?: PlacementSkillCreateNestedManyWithoutPlacementInput
    attachments?: AttachmentCreateNestedManyWithoutPlacementInput
  }

  export type PlacementUncheckedCreateWithoutBranchesInput = {
    id?: number
    companyId: number
    position: string
    ctc: number
    deadline: Date | string
    cgpaCutoff: number
    description?: string | null
    status?: string
    activeRound?: string
    appliedCount?: number
    shortlistedCount?: number
    offeredCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    skills?: PlacementSkillUncheckedCreateNestedManyWithoutPlacementInput
    attachments?: AttachmentUncheckedCreateNestedManyWithoutPlacementInput
  }

  export type PlacementCreateOrConnectWithoutBranchesInput = {
    where: PlacementWhereUniqueInput
    create: XOR<PlacementCreateWithoutBranchesInput, PlacementUncheckedCreateWithoutBranchesInput>
  }

  export type BranchCreateWithoutPlacementsInput = {
    name: string
    users?: UserCreateNestedManyWithoutBranchInput
  }

  export type BranchUncheckedCreateWithoutPlacementsInput = {
    id?: number
    name: string
    users?: UserUncheckedCreateNestedManyWithoutBranchInput
  }

  export type BranchCreateOrConnectWithoutPlacementsInput = {
    where: BranchWhereUniqueInput
    create: XOR<BranchCreateWithoutPlacementsInput, BranchUncheckedCreateWithoutPlacementsInput>
  }

  export type PlacementUpsertWithoutBranchesInput = {
    update: XOR<PlacementUpdateWithoutBranchesInput, PlacementUncheckedUpdateWithoutBranchesInput>
    create: XOR<PlacementCreateWithoutBranchesInput, PlacementUncheckedCreateWithoutBranchesInput>
    where?: PlacementWhereInput
  }

  export type PlacementUpdateToOneWithWhereWithoutBranchesInput = {
    where?: PlacementWhereInput
    data: XOR<PlacementUpdateWithoutBranchesInput, PlacementUncheckedUpdateWithoutBranchesInput>
  }

  export type PlacementUpdateWithoutBranchesInput = {
    position?: StringFieldUpdateOperationsInput | string
    ctc?: FloatFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    cgpaCutoff?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    activeRound?: StringFieldUpdateOperationsInput | string
    appliedCount?: IntFieldUpdateOperationsInput | number
    shortlistedCount?: IntFieldUpdateOperationsInput | number
    offeredCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutPlacementsNestedInput
    skills?: PlacementSkillUpdateManyWithoutPlacementNestedInput
    attachments?: AttachmentUpdateManyWithoutPlacementNestedInput
  }

  export type PlacementUncheckedUpdateWithoutBranchesInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    position?: StringFieldUpdateOperationsInput | string
    ctc?: FloatFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    cgpaCutoff?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    activeRound?: StringFieldUpdateOperationsInput | string
    appliedCount?: IntFieldUpdateOperationsInput | number
    shortlistedCount?: IntFieldUpdateOperationsInput | number
    offeredCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skills?: PlacementSkillUncheckedUpdateManyWithoutPlacementNestedInput
    attachments?: AttachmentUncheckedUpdateManyWithoutPlacementNestedInput
  }

  export type BranchUpsertWithoutPlacementsInput = {
    update: XOR<BranchUpdateWithoutPlacementsInput, BranchUncheckedUpdateWithoutPlacementsInput>
    create: XOR<BranchCreateWithoutPlacementsInput, BranchUncheckedCreateWithoutPlacementsInput>
    where?: BranchWhereInput
  }

  export type BranchUpdateToOneWithWhereWithoutPlacementsInput = {
    where?: BranchWhereInput
    data: XOR<BranchUpdateWithoutPlacementsInput, BranchUncheckedUpdateWithoutPlacementsInput>
  }

  export type BranchUpdateWithoutPlacementsInput = {
    name?: StringFieldUpdateOperationsInput | string
    users?: UserUpdateManyWithoutBranchNestedInput
  }

  export type BranchUncheckedUpdateWithoutPlacementsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    users?: UserUncheckedUpdateManyWithoutBranchNestedInput
  }

  export type PlacementCreateWithoutAttachmentsInput = {
    position: string
    ctc: number
    deadline: Date | string
    cgpaCutoff: number
    description?: string | null
    status?: string
    activeRound?: string
    appliedCount?: number
    shortlistedCount?: number
    offeredCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutPlacementsInput
    skills?: PlacementSkillCreateNestedManyWithoutPlacementInput
    branches?: PlacementBranchCreateNestedManyWithoutPlacementInput
  }

  export type PlacementUncheckedCreateWithoutAttachmentsInput = {
    id?: number
    companyId: number
    position: string
    ctc: number
    deadline: Date | string
    cgpaCutoff: number
    description?: string | null
    status?: string
    activeRound?: string
    appliedCount?: number
    shortlistedCount?: number
    offeredCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    skills?: PlacementSkillUncheckedCreateNestedManyWithoutPlacementInput
    branches?: PlacementBranchUncheckedCreateNestedManyWithoutPlacementInput
  }

  export type PlacementCreateOrConnectWithoutAttachmentsInput = {
    where: PlacementWhereUniqueInput
    create: XOR<PlacementCreateWithoutAttachmentsInput, PlacementUncheckedCreateWithoutAttachmentsInput>
  }

  export type PlacementChunkCreateWithoutAttachmentInput = {
    chunkText: string
  }

  export type PlacementChunkUncheckedCreateWithoutAttachmentInput = {
    id?: number
    chunkText: string
  }

  export type PlacementChunkCreateOrConnectWithoutAttachmentInput = {
    where: PlacementChunkWhereUniqueInput
    create: XOR<PlacementChunkCreateWithoutAttachmentInput, PlacementChunkUncheckedCreateWithoutAttachmentInput>
  }

  export type PlacementChunkCreateManyAttachmentInputEnvelope = {
    data: PlacementChunkCreateManyAttachmentInput | PlacementChunkCreateManyAttachmentInput[]
    skipDuplicates?: boolean
  }

  export type PlacementUpsertWithoutAttachmentsInput = {
    update: XOR<PlacementUpdateWithoutAttachmentsInput, PlacementUncheckedUpdateWithoutAttachmentsInput>
    create: XOR<PlacementCreateWithoutAttachmentsInput, PlacementUncheckedCreateWithoutAttachmentsInput>
    where?: PlacementWhereInput
  }

  export type PlacementUpdateToOneWithWhereWithoutAttachmentsInput = {
    where?: PlacementWhereInput
    data: XOR<PlacementUpdateWithoutAttachmentsInput, PlacementUncheckedUpdateWithoutAttachmentsInput>
  }

  export type PlacementUpdateWithoutAttachmentsInput = {
    position?: StringFieldUpdateOperationsInput | string
    ctc?: FloatFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    cgpaCutoff?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    activeRound?: StringFieldUpdateOperationsInput | string
    appliedCount?: IntFieldUpdateOperationsInput | number
    shortlistedCount?: IntFieldUpdateOperationsInput | number
    offeredCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutPlacementsNestedInput
    skills?: PlacementSkillUpdateManyWithoutPlacementNestedInput
    branches?: PlacementBranchUpdateManyWithoutPlacementNestedInput
  }

  export type PlacementUncheckedUpdateWithoutAttachmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyId?: IntFieldUpdateOperationsInput | number
    position?: StringFieldUpdateOperationsInput | string
    ctc?: FloatFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    cgpaCutoff?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    activeRound?: StringFieldUpdateOperationsInput | string
    appliedCount?: IntFieldUpdateOperationsInput | number
    shortlistedCount?: IntFieldUpdateOperationsInput | number
    offeredCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skills?: PlacementSkillUncheckedUpdateManyWithoutPlacementNestedInput
    branches?: PlacementBranchUncheckedUpdateManyWithoutPlacementNestedInput
  }

  export type PlacementChunkUpsertWithWhereUniqueWithoutAttachmentInput = {
    where: PlacementChunkWhereUniqueInput
    update: XOR<PlacementChunkUpdateWithoutAttachmentInput, PlacementChunkUncheckedUpdateWithoutAttachmentInput>
    create: XOR<PlacementChunkCreateWithoutAttachmentInput, PlacementChunkUncheckedCreateWithoutAttachmentInput>
  }

  export type PlacementChunkUpdateWithWhereUniqueWithoutAttachmentInput = {
    where: PlacementChunkWhereUniqueInput
    data: XOR<PlacementChunkUpdateWithoutAttachmentInput, PlacementChunkUncheckedUpdateWithoutAttachmentInput>
  }

  export type PlacementChunkUpdateManyWithWhereWithoutAttachmentInput = {
    where: PlacementChunkScalarWhereInput
    data: XOR<PlacementChunkUpdateManyMutationInput, PlacementChunkUncheckedUpdateManyWithoutAttachmentInput>
  }

  export type PlacementChunkScalarWhereInput = {
    AND?: PlacementChunkScalarWhereInput | PlacementChunkScalarWhereInput[]
    OR?: PlacementChunkScalarWhereInput[]
    NOT?: PlacementChunkScalarWhereInput | PlacementChunkScalarWhereInput[]
    id?: IntFilter<"PlacementChunk"> | number
    attachmentId?: IntFilter<"PlacementChunk"> | number
    chunkText?: StringFilter<"PlacementChunk"> | string
  }

  export type AttachmentCreateWithoutChunksInput = {
    filePath: string
    fileType: string
    placement: PlacementCreateNestedOneWithoutAttachmentsInput
  }

  export type AttachmentUncheckedCreateWithoutChunksInput = {
    id?: number
    placementId: number
    filePath: string
    fileType: string
  }

  export type AttachmentCreateOrConnectWithoutChunksInput = {
    where: AttachmentWhereUniqueInput
    create: XOR<AttachmentCreateWithoutChunksInput, AttachmentUncheckedCreateWithoutChunksInput>
  }

  export type AttachmentUpsertWithoutChunksInput = {
    update: XOR<AttachmentUpdateWithoutChunksInput, AttachmentUncheckedUpdateWithoutChunksInput>
    create: XOR<AttachmentCreateWithoutChunksInput, AttachmentUncheckedCreateWithoutChunksInput>
    where?: AttachmentWhereInput
  }

  export type AttachmentUpdateToOneWithWhereWithoutChunksInput = {
    where?: AttachmentWhereInput
    data: XOR<AttachmentUpdateWithoutChunksInput, AttachmentUncheckedUpdateWithoutChunksInput>
  }

  export type AttachmentUpdateWithoutChunksInput = {
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    placement?: PlacementUpdateOneRequiredWithoutAttachmentsNestedInput
  }

  export type AttachmentUncheckedUpdateWithoutChunksInput = {
    id?: IntFieldUpdateOperationsInput | number
    placementId?: IntFieldUpdateOperationsInput | number
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
  }

  export type StudentSkillCreateManyUserInput = {
    skillId: number
  }

  export type StudentSkillUpdateWithoutUserInput = {
    skill?: SkillUpdateOneRequiredWithoutStudentsNestedInput
  }

  export type StudentSkillUncheckedUpdateWithoutUserInput = {
    skillId?: IntFieldUpdateOperationsInput | number
  }

  export type StudentSkillUncheckedUpdateManyWithoutUserInput = {
    skillId?: IntFieldUpdateOperationsInput | number
  }

  export type PlacementCreateManyCompanyInput = {
    id?: number
    position: string
    ctc: number
    deadline: Date | string
    cgpaCutoff: number
    description?: string | null
    status?: string
    activeRound?: string
    appliedCount?: number
    shortlistedCount?: number
    offeredCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlacementUpdateWithoutCompanyInput = {
    position?: StringFieldUpdateOperationsInput | string
    ctc?: FloatFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    cgpaCutoff?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    activeRound?: StringFieldUpdateOperationsInput | string
    appliedCount?: IntFieldUpdateOperationsInput | number
    shortlistedCount?: IntFieldUpdateOperationsInput | number
    offeredCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skills?: PlacementSkillUpdateManyWithoutPlacementNestedInput
    branches?: PlacementBranchUpdateManyWithoutPlacementNestedInput
    attachments?: AttachmentUpdateManyWithoutPlacementNestedInput
  }

  export type PlacementUncheckedUpdateWithoutCompanyInput = {
    id?: IntFieldUpdateOperationsInput | number
    position?: StringFieldUpdateOperationsInput | string
    ctc?: FloatFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    cgpaCutoff?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    activeRound?: StringFieldUpdateOperationsInput | string
    appliedCount?: IntFieldUpdateOperationsInput | number
    shortlistedCount?: IntFieldUpdateOperationsInput | number
    offeredCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skills?: PlacementSkillUncheckedUpdateManyWithoutPlacementNestedInput
    branches?: PlacementBranchUncheckedUpdateManyWithoutPlacementNestedInput
    attachments?: AttachmentUncheckedUpdateManyWithoutPlacementNestedInput
  }

  export type PlacementUncheckedUpdateManyWithoutCompanyInput = {
    id?: IntFieldUpdateOperationsInput | number
    position?: StringFieldUpdateOperationsInput | string
    ctc?: FloatFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    cgpaCutoff?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    activeRound?: StringFieldUpdateOperationsInput | string
    appliedCount?: IntFieldUpdateOperationsInput | number
    shortlistedCount?: IntFieldUpdateOperationsInput | number
    offeredCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlacementSkillCreateManyPlacementInput = {
    skillId: number
  }

  export type PlacementBranchCreateManyPlacementInput = {
    branchId: number
  }

  export type AttachmentCreateManyPlacementInput = {
    id?: number
    filePath: string
    fileType: string
  }

  export type PlacementSkillUpdateWithoutPlacementInput = {
    skill?: SkillUpdateOneRequiredWithoutPlacementsNestedInput
  }

  export type PlacementSkillUncheckedUpdateWithoutPlacementInput = {
    skillId?: IntFieldUpdateOperationsInput | number
  }

  export type PlacementSkillUncheckedUpdateManyWithoutPlacementInput = {
    skillId?: IntFieldUpdateOperationsInput | number
  }

  export type PlacementBranchUpdateWithoutPlacementInput = {
    branch?: BranchUpdateOneRequiredWithoutPlacementsNestedInput
  }

  export type PlacementBranchUncheckedUpdateWithoutPlacementInput = {
    branchId?: IntFieldUpdateOperationsInput | number
  }

  export type PlacementBranchUncheckedUpdateManyWithoutPlacementInput = {
    branchId?: IntFieldUpdateOperationsInput | number
  }

  export type AttachmentUpdateWithoutPlacementInput = {
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    chunks?: PlacementChunkUpdateManyWithoutAttachmentNestedInput
  }

  export type AttachmentUncheckedUpdateWithoutPlacementInput = {
    id?: IntFieldUpdateOperationsInput | number
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    chunks?: PlacementChunkUncheckedUpdateManyWithoutAttachmentNestedInput
  }

  export type AttachmentUncheckedUpdateManyWithoutPlacementInput = {
    id?: IntFieldUpdateOperationsInput | number
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateManyBranchInput = {
    id?: number
    email: string
    passwordHash: string
    role?: $Enums.Role
    name: string
    rollNo?: string | null
    cgpa?: number | null
    institute?: $Enums.Institute | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlacementBranchCreateManyBranchInput = {
    placementId: number
  }

  export type UserUpdateWithoutBranchInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    rollNo?: NullableStringFieldUpdateOperationsInput | string | null
    cgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    institute?: NullableEnumInstituteFieldUpdateOperationsInput | $Enums.Institute | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skills?: StudentSkillUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBranchInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    rollNo?: NullableStringFieldUpdateOperationsInput | string | null
    cgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    institute?: NullableEnumInstituteFieldUpdateOperationsInput | $Enums.Institute | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skills?: StudentSkillUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutBranchInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    rollNo?: NullableStringFieldUpdateOperationsInput | string | null
    cgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    institute?: NullableEnumInstituteFieldUpdateOperationsInput | $Enums.Institute | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlacementBranchUpdateWithoutBranchInput = {
    placement?: PlacementUpdateOneRequiredWithoutBranchesNestedInput
  }

  export type PlacementBranchUncheckedUpdateWithoutBranchInput = {
    placementId?: IntFieldUpdateOperationsInput | number
  }

  export type PlacementBranchUncheckedUpdateManyWithoutBranchInput = {
    placementId?: IntFieldUpdateOperationsInput | number
  }

  export type StudentSkillCreateManySkillInput = {
    userId: number
  }

  export type PlacementSkillCreateManySkillInput = {
    placementId: number
  }

  export type StudentSkillUpdateWithoutSkillInput = {
    user?: UserUpdateOneRequiredWithoutSkillsNestedInput
  }

  export type StudentSkillUncheckedUpdateWithoutSkillInput = {
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type StudentSkillUncheckedUpdateManyWithoutSkillInput = {
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type PlacementSkillUpdateWithoutSkillInput = {
    placement?: PlacementUpdateOneRequiredWithoutSkillsNestedInput
  }

  export type PlacementSkillUncheckedUpdateWithoutSkillInput = {
    placementId?: IntFieldUpdateOperationsInput | number
  }

  export type PlacementSkillUncheckedUpdateManyWithoutSkillInput = {
    placementId?: IntFieldUpdateOperationsInput | number
  }

  export type PlacementChunkCreateManyAttachmentInput = {
    id?: number
    chunkText: string
  }

  export type PlacementChunkUpdateWithoutAttachmentInput = {
    chunkText?: StringFieldUpdateOperationsInput | string
  }

  export type PlacementChunkUncheckedUpdateWithoutAttachmentInput = {
    id?: IntFieldUpdateOperationsInput | number
    chunkText?: StringFieldUpdateOperationsInput | string
  }

  export type PlacementChunkUncheckedUpdateManyWithoutAttachmentInput = {
    id?: IntFieldUpdateOperationsInput | number
    chunkText?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}