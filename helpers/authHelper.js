import bcrypt from "bcrypt";

export const hasPassword = async (password) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);
    return hash;
  } catch (error) {
    console.log(error);
  }
};

export const comparepassword = async (password, hasedPassword) => {
  const compare = await bcrypt.compareSync(password, hasedPassword);
  return compare;
};
