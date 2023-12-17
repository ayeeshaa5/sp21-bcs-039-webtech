import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

export const hashString = async (useValue) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(useValue, salt);
    return hashedPassword;
};

export const compareString = async (usePassword, password) => {
    const isMatch = await bcrypt.compare(usePassword, password);
    return isMatch;
};

// export function createJWT (id){
//     return JWT.sign({userId:id}, process.env.JWT_SECRET, {
//         expiresIn: '1d'
//     });
// }
export function createJWT(id) {
    return JWT.sign({ userId: id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });
  }