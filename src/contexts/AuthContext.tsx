import * as fcl from "@onflow/fcl";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode
} from "react";

export const AuthContext = createContext<{
    currentUser:any;
    userProfile:any;
    profileExists:any;
    logOut:any;
    logIn:any;
    signUp:any;
    loadProfile:any
}>({
    currentUser:undefined,
    userProfile:undefined,
    profileExists:undefined,
    logOut:undefined,
    logIn:undefined,
    signUp:undefined,
    loadProfile:undefined
    
});

export const useAuth = () => useContext(AuthContext);

interface Props {
    children?: ReactNode
    // any props that come into the component
}

export const  AuthProvider = ({ children }:Props) => {

  const [currentUser, setUser] = useState({ loggedIn: false, addr: undefined });
  const [userProfile, setProfile] = useState(null);
  const [profileExists, setProfileExists] = useState(false);

  useEffect(() => {fcl.currentUser.subscribe(setUser)}, []);

  const loadProfile = useCallback(async () => {
    const profile = await fcl.query({
      cadence: `
        import Profile from 0xProfile

        pub fun main(address: Address): Profile.ReadOnly? {
          return Profile.read(address)
        }
      `,
      // args: (arg, t) => [arg(currentUser.addr, t.Address)],
    });
    setProfile(profile ?? null);
    setProfileExists(profile !== null);
    return profile;
  }, [currentUser, setProfile, setProfileExists]);

  useEffect(() => {
    // Upon login check if a userProfile exists
    if (currentUser.loggedIn && userProfile === null) {
      loadProfile();
    }
  }, [currentUser, userProfile, loadProfile]);

  const logOut = async () => {
    await fcl.unauthenticate();
    setUser({ addr: undefined, loggedIn: false });
    setProfile(null);
    setProfileExists(false);
  };

  const logIn = () => {
    fcl.logIn();
  };

  const signUp = () => {
    fcl.signUp();
  };

//   const createProfile = async () => {
//     initTransactionState();

//     const transactionId = await fcl.mutate({
//       cadence: `
//         import Profile from 0xProfile

//         transaction {
//           prepare(account: AuthAccount) {
//             // Only initialize the account if it hasn't already been initialized
//             if (!Profile.check(account.address)) {
//               // This creates and stores the profile in the user's account
//               account.save(<- Profile.new(), to: Profile.privatePath)

//               // This creates the public capability that lets applications read the profile's info
//               account.link<&Profile.Base{Profile.Public}>(Profile.publicPath, target: Profile.privatePath)
//             }
//           }
//         }
//       `,
//       payer: fcl.authz,
//       proposer: fcl.authz,
//       authorizations: [fcl.authz],
//       limit: 50,
//     });
//     setTxId(transactionId);
//     fcl.tx(transactionId).subscribe((res) => {
//       setTransactionStatus(res.status);
//       if (res.status === 4) {
//         loadProfile();
//       }
//     });
//   };

//   const updateProfile = async ({ name, color, info }) => {
//     console.log("Updating profile", { name, color, info });
//     initTransactionState();

//     const transactionId = await fcl.mutate({
//       cadence: `
//         import Profile from 0xProfile

//         transaction(name: String, color: String, info: String) {
//           prepare(account: AuthAccount) {
//             account
//               .borrow<&Profile.Base{Profile.Owner}>(from: Profile.privatePath)!
//               .setName(name)

//             account
//               .borrow<&Profile.Base{Profile.Owner}>(from: Profile.privatePath)!
//               .setInfo(info)

//             account
//               .borrow<&Profile.Base{Profile.Owner}>(from: Profile.privatePath)!
//               .setColor(color)
//           }
//         }
//       `,
//       args: (arg, t) => [
//         arg(name, t.String),
//         arg(color, t.String),
//         arg(info, t.String),
//       ],
//       payer: fcl.authz,
//       proposer: fcl.authz,
//       authorizations: [fcl.authz],
//       limit: 50,
//     });
//     setTxId(transactionId);
//     fcl.tx(transactionId).subscribe((res) => {
//       setTransactionStatus(res.status);
//       if (res.status === 4) {
//         loadProfile();
//       }
//     });
//   };

  const value = {
    currentUser,
    userProfile,
    profileExists,
    logOut,
    logIn,
    signUp,
    loadProfile,
    // createProfile,
    // updateProfile,
  };

  console.log("AuthProvider", value);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}