const Mail = require('../services/Mail')

class PurchaseMail {
  get key () {
    return 'purchaseMail'
  }

  async handle (job, ctx, done) {
    const { ad, user, content } = job.data

    ctx.pause(5000, function () {
      console.log('Worker is paused... ')
      setTimeout(function () {
        console.log('Worker resume...')
        ctx.resume()
      }, 5000)
    })
    await Mail.sendMail({
      from: ' "App Marketing" <app@marketing.com>',
      to: ad.author.email,
      replyTo: user.email,
      subject: `Nova intenção de compra: ${ad.title}`,
      template: 'purchase',
      context: { ad, user, content }
    })
    return done()
  }
}

module.exports = new PurchaseMail()
