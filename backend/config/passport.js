const GoogleStrategy = require("passport-google-oauth20").Strategy;
let JwtStrategy = require("passport-jwt").Strategy;
let ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, done) {
      //   若要儲存google回傳的相關資料，可這裡用User的schema
      // 把資料傳到req.session
      done(null, profile);
    }
  )
);

let opts = {};

// 於postman內的Headers當中填入Authorization:JWT token
// ExtractJwt.fromAuthHeaderWithScheme("jwt") => 找尋是 JWT OR jwt開頭的後面的值
// ExtractJwt.fromAuthHeaderAsBearerToken(); => 找尋是 bearer開頭的後面的值
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");

// 得跟當時簽名的secret相同
opts.secretOrKey = process.env.PASSPORT_SECRET;

passport.use(
  // 1. 由 new JwtStrategy 檢查JWT，並回傳一個解析JWT後解析出來的東西存到jwt_payload
  new JwtStrategy(opts, async function (jwt_payload, done) {
    // if (Date.now() > jwt_payload.exp) {
    //   // 回傳 req.user = false的話，自然這認證就失敗，不用做其他檢查機制
    //   // 如果要做，則要注意如何提示 + 導向登入畫面
    //   return done(null, false);
    // }
    try {
      return done(null, jwt_payload);
    } catch (e) {
      return done(e, false);
    }
  })
);
