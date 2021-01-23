/* global WIKI */

// ------------------------------------
// header Account
// ------------------------------------

const HeaderStrategy = require('passport-trusted-header').Strategy

module.exports = {
  init (passport, conf) {
    WIKI.logger.info('===============' + JSON.stringify(conf))
    passport.use('reverseproxyheader',
      new HeaderStrategy({
        headers: [
          conf.userHeader,
          conf.emailHeader,
          conf.nameHeader
        ],
        passReqToCallback: true
      }, async (req, requestHeaders, done) => {
        var profile = {
          id: requestHeaders[conf.userHeader],
          email: requestHeaders[conf.emailHeader],
          name: requestHeaders[conf.nameHeader]
        }
        WIKI.logger.info('===============' + JSON.stringify(profile))
        const user = await WIKI.models.users.processProfile({profile: profile, providerKey: req.params.strategy})
        WIKI.logger.info('===============' + JSON.stringify(user))
        done(null, user)
      }
      ))
  }
}
