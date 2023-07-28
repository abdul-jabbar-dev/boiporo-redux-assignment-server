import mongoose from "mongoose";
import TUser, { TUserRegistration } from "./user.interface";
import USER from "./user.schema";
import env from "../../config/env";

export const registrationDB = async (user: TUserRegistration) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const isExist = await USER.findOne({ email: user.email }).lean();
  if (isExist) {
    throw "This email is exist";
  }
  try {
    const result = await USER.create([user], { session });
    if (!result || result.length === 0) {
      throw new Error("Internal server error");
    }
    const decodedPassword = await USER.passwordDecord(result[0].password);
    result[0].password = decodedPassword;
    await result[0].validate();
    await result[0].save({ session });

    const accessToken = await USER.getToken(
      result[0]._id as unknown as string,
      env.ACCESS_TOKEN_EXPIRE
    );
    result[0].accessToken = accessToken;

    const refreshToken = await USER.getToken(
      result[0]._id as unknown as string,
      env.REFRESH_TOKEN_EXPIRE
    );
    result[0].refreshToken = refreshToken;

    await result[0].save({ session });
    const nuser = await USER.findById(
      result[0]._id,
      { password: 0 },
      { session }
    );

    if (!nuser) {
      throw "Registration failed";
    }

    await session.commitTransaction();
    return nuser;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

export const loginUserDB = async () => {};

export const getAllUserDB = async () => {
  try {
    const result = await USER.find({}, { password: 0 });
    return result;
  } catch (error) {
    throw error;
  }
};
