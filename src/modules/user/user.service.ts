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

    const token = await USER.getToken(result[0]._id, env.TOKEN_EXPIRE);
    result[0].token = token;

    await result[0].save({ session });
    const nuser = await USER.findById(
      result[0]._id,
      { password: 0 },
      { session }
    ).lean();

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

export const loginUserDB = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const session = await mongoose.startSession();

  try {
    await session.startTransaction();
    const user = await USER.findOne({ email }, {}, { session });
    if (!user) {
      throw "This user is not a subscriber. try to registration!";
    }
    const match = await USER.passwordMatch(password, user.password);
    if (!match) {
      throw "Password didn't match";
    }
    const token = await USER.getToken(user._id, env.TOKEN_EXPIRE);

    user.token = token;
    await user.save({ session });
    await session.commitTransaction();
    return user;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

export const getAllUserDB = async () => {
  try {
    const result = await USER.find({}, { password: 0 });
    return result;
  } catch (error) {
    throw error;
  }
};

export const logoutUserDB = async ({ email }: { email: string }) => {
  try {
    const result = await USER.findOne({ email });
    if (!result) {
      throw "Logout unsuccessfully";
    }
    result.token = "";
    result.save();
    return result;
  } catch (error) {
    throw error;
  }
};
