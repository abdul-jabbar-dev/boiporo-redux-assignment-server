import mongoose from "mongoose";
import TUser, { TUserRegistration } from "./user.interface";
import USER from "./user.schema";

export const registrationDB = async (user: TUserRegistration) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  let sendRes;
  try {
    const result = await USER.create([user], { session });
    if (!result || result.length === 0) {
      throw new Error("Internal server error");
    }
    const decodedPassword = await USER.passwordDecord(result[0].password);
    result[0].password = decodedPassword;
    await result[0].validate();
    await result[0].save({ session });
    await session.commitTransaction();
    return result[0]
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
  return sendRes;
};
export const getAllUserDB = async () => {
  try {
    const result = await USER.find({}, { password: 0 });
    return result;
  } catch (error) {
    throw error;
  }
};
