import { ServerResponse } from 'http';
import * as uuid from "uuid";
import { Fields, StatusCodes } from './constants';
import { IUser } from './interfaces';
import messages from './messages';

export const getUuidFromUrl = (url: string | undefined) => url?.split('/').at(-1)

export const isUuidValid = (url: string | undefined): boolean => {
  if(!url) return false
  const uuidFromUrl: string | undefined = url.split("/").pop()
  return uuid.validate(uuidFromUrl as string)
};

export const isStringArr = (arr: object): boolean => {
  if (Array.isArray(arr)) {
    let result = true;

    arr.forEach((el) => {
      if (typeof el !== "string") {
        result = false;
      }
    });

    return result;
  } else {
    return false;
  }
};

export const parseReqBody = (res: ServerResponse, reqBody: string, isUpdate: boolean = false, user: IUser | null = null): IUser | undefined => {
  try {
    const parsedJSON: IUser = JSON.parse(reqBody);
    const objKeys: string[] = Object.keys(parsedJSON);

    if (isUpdate) {
      const userToUpdate: IUser | null = user;

      if (userToUpdate !== null) {
        if (
          objKeys.includes(Fields.USERNAME) &&
          typeof parsedJSON[Fields.USERNAME] === "string"
        ) {
          userToUpdate[Fields.USERNAME] = parsedJSON[Fields.USERNAME];
        }

        if (
          objKeys.includes(Fields.AGE) &&
          typeof parsedJSON[Fields.AGE] === "number"
        ) {
          userToUpdate[Fields.AGE] = parsedJSON[Fields.AGE];
        }

        if (
          objKeys.includes(Fields.HOBBIES) &&
          isStringArr(parsedJSON[Fields.HOBBIES])
        ) {
          userToUpdate[Fields.HOBBIES] = parsedJSON[Fields.HOBBIES];
        }
        return userToUpdate;
      }
    } else if (
      objKeys.includes(Fields.USERNAME) &&
      typeof parsedJSON[Fields.USERNAME] === "string" &&
      objKeys.includes(Fields.AGE) &&
      typeof parsedJSON[Fields.AGE] === "number" &&
      objKeys.includes(Fields.HOBBIES) &&
      isStringArr(parsedJSON[Fields.HOBBIES])
    ) {
      return  {
        id: uuid.v4(),
        username: parsedJSON["username"],
        age: parsedJSON["age"],
        hobbies: parsedJSON["hobbies"],
      };
    } else {
      throw new Error(messages.incorrectReqBody);
    }
  } catch (err) {
    if (err) {
      res.writeHead(StatusCodes.BAD_REQUEST, { "Content-type": "application/json" });
      res.write(JSON.stringify({ message: messages.incorrectReqBody }));
      res.end();
    }
  }
}
