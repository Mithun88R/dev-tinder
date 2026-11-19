# DevTinder APIs

authRouter

- POST/signup
- POST/signin
- POST/logout

profileRouter

- GET/profile/view
- PATCH/profile/edit
- PATCH/profile/password

requestRouter

- POST/request/send/interested/:userId
- POST/request/send/ignored/:userId
- POST/request/receive/accept/:requestId
- POST/request/receive/reject/:requestId

userRouter

- GET/user/connections
- GET/user/requests/receive
- GET/user/feed - Gets you the profile of other users
