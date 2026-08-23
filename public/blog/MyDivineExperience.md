# My Divine Experience

![hero image](https://raw.githubusercontent.com/Marc26z/FunWithFreedomTech/86cd7f61b00f0d120419ed53143f4246424d86de/public/blog/images/MyDvineExperience.jpg)

Back in the day, I took a ton of Instagram photos. I wasn't a photo-fluencer, but I enjoyed taking stupid photos of silly stuff with super snazzy filters. One day I met a woman at a beer festival who showed me Vine. Said it was the Instagram killer. Pictures were boring. Video was the new Usenet. Just kidding. She didn't say Usenet, but proclaimed it was an evolution in social media. This proclomation got me excited about this newfangled technology.

Trouble was, my phone was too cheap, slow, and lame to download Vine. I was having fun staying poor and couldn't afford one of those fancy iPhones with Gorilla Glass and 3G  whatever. I had a cheap phone running the Android Open Source Project. This made me a tad jealous. I was on a budget. I never did anything "for the Vine" because... I found another free and open source project that captured my imagination. Let's just say I moved on to other things.

Instagram didn't die, but it did [enshittificate](https://en.wikipedia.org/wiki/Cory_Doctorow#Enshittification). One of my favorite features was Instagram had no ads whatsoever. I saw pictures posted by friends I knew in real life. That's no longer the case. I get to see a few photos of family here and there, but the photos are all but gone, replaced by commercials of people I don't know doing stuff I don't care about. I notice a lot of ads for stuff my wife would like, but never photos of my wife.

 Divine is nostalgic. It reminds me of the good ol' days before I yelled at people for walking on my lawn and wanted to poke my eyes out after watching an incessant stream of ads. I'm not sure if that will always be the case, but I like the way Rabble talks about the project on [Social.Revolution](https://fountain.fm/show/2haWaxyUrTo9Ms9g95eo). They made me see 

## Divine Is On The Nostr

![Boring Nostr Math](https://raw.githubusercontent.com/Marc26z/FunWithFreedomTech/d9b9ec65dab20906430e2b365d4e74fa9f83b53b/public/blog/images/BoringNostrMath_1.jpg)

I first heard about Divine on [nostr](https://nostr.org), an Internet protocol designed for *nerds who use math public schools don't teach*. The protocol was originally implemented as an alternative to Twitter. The idea is to use [digital signatures](https://en.wikipedia.org/wiki/Digital_signature) to transmit notes and other stuff over relays. "Notes" is a euphemism for tweets, but the **other stuff is where it gets interesting**. In a nutshell, Nostr allows you to create an online identity that is not owned by any government or corporation. You are the owner. You are responsible for your secret key. You are also responsible for what you say, so it's probably not a good idea to film yourself doing illegal stuff, but I'm not a lawyer.

In cybersecurity, the specific term is PKI (Public Key Infrastructure). The basic idea is to create a mathematically provable identity. It sounds complicated, but the brightest way to think of it is as a [digital signature](https://en.wikipedia.org/wiki/Digital_signature). A digital signature has two parts. The first part is called **a private key, but it is better to think of it as a secret key**. In fact, we call our private keys an "nsec." The "sec" means secret. You want to keep it safe. An "npub" is public. Your private key cannot be guessed from the public key with our current mathematical understanding and computing power. That means you can share your npub with everyone and their mother. Anyone can use this public key to follow you. Here is mine:

**npub1marc26z8nh3xkj5rcx7ufkatvx6ueqhp5vfw9v5teq26z254renshtf3g0**

This is called a vanity key and it requires some technical prowess, but I used [rana](https://github.com/grunch/rana) if you must know. I imported this key into Divine and use it in many clients/apps. I also started taking up watercolor painting as a hobby. I like to sign my art with a truncated version of that public key. Here's an example from a recent Divine video I made.

[![Video thumbnail](https://marc26z.divine.video/video/a52f39c1e9e000c000996774a25c7c9b8fdc25df97d6ac2e9dbe534a5c4fa085)](https://marc26z.divine.video/video/a52f39c1e9e000c000996774a25c7c9b8fdc25df97d6ac2e9dbe534a5c4fa085)

*click the photo to view the video above*

**I also use the Amber app to protect my secret key, to practice safe nsec.** Here is what an nsec looks like:

🚨🚨 WARNING! THIS IS AN EXAMPLE. NEVER SHARE OR POST YOUR NSEC ONLINE. 🚨🚨

`nsec1v5x55smrap4wnl4gqmmm473tuemsr5jh8fypk7hhappgjyadaxesscds9u`

🚨🚨 WARNING! THIS IS AN EXAMPLE. NEVER SHARE OR POST YOUR NSEC ONLINE. 🚨🚨

This is your digital signature. You might want to write down your nsec and keep it in a safe place. Keep it a secret. A good rule of thumb is:
- nsec is secret
- npub is public

I am a promiscuous Nostr app user. This is not necessary if you are only using Divine, but Nostr has much more to offer. I was able to add all my Divine videos to my website at [Fun With Freedom Tech](https://funwithfreedomtech.com/). It's a work in progress, but the protocol helps me focus on front-end web development while much of the backend is outsourced to nostr relays. It makes coding fun again. I've hosted video apps in the fediverse before like peertube. It works great, until something breaks. Than you're down until you can buy a new SSD. Those things aren't getting any cheaper.

Ater seeing Rabble mention the "kinds" on the [GitHub repository](https://github.com/divinevideo). Then I learned, **everyone on Divine has their personal video webpage**. Here is my Divine  realized I could create a custom website that automatically posted my Divine videos webpage(subdomain if you're technical).:

https://marc26z.divine.video/

 This is the kind of stuff that makes nostr weird, and that's what I'm here for. Nostr clients communicate with each other like someone sending an email from a Gmail address to a Yahoo address. Hat tip [Lyn Alden](https://primal.net/lyn) who I first heard describe it this way, but it's damn good. Imagine if you could post a video on Instagram and 
 - Your IRL friends on Instagram could actually see it.
 - Your TikTok friends could see it
 - Your gradmother on Facebook could see it

That's how nostr works. of course, maybe you don't want your friends seeing the same photos as your family, but let's not get ahead of ourselves. The advantage of this protocol arcitecture is two fold.
1. The user holds the secret key to the identity. If the user is kicked off divine, they can still talk to their friends on [Damus](https://damus.io/), [Hivetalk](https://hivetalk.org/), or any other nostr client. **You don't need to start over**. *Does that mean you can't censor Trump?* **Correct**. *What if my poliical team wants to kick Mamdani off of nostr?* **Sucks to be your team.**

[Divine](https://divine.video/) is built on the [Nostr protocol](https://nostr.org), but why should you care? You probably don't care unless you are some nerd who throws 100 dice because math is fun. I like it because the Nostr protocol is interoperable. That's why **my Divine videos show up on my website after posting them**. I don't need to do anything else. I vibe-coded a website with `Shakesphere.diy` by telling it to add NIP-71 kind 34236 short videos. I know how to code and I know what a [NIP](https://github.com/nostr-protocol/nips) is. That's basically all it took. Now all of my six-second videos show up on my website. That's the biggest reason I like Divine. If you would like to try this on your own, I recommend checking out [Nostrhub](https://nostrhub.io/nips). It helps to know how to code, but you can easily make your own apps and websites if you can write well enough for the AI to understand. The more specific, the better.

If a taco truck had a Divine QR code, I could just scan the QR code and see taco videos. Cool beans. I am here for the taco videos, which is a little ironic since Taco Bell is the first public corporation to join Divine, as far as I know anyway.

It seems silly, but I can't tell you how many times I see a food truck promoting Instagram on their mobile taco lab. It's ubiquitous. It's also an email paywall. I can't just scan these QR codes to see taco photos; I must download the app and agree to the terms and conditions Zuck's lawyers wrote and ain't nobody got time to read. Read Rabble's [Social Media Bill of Rights instead](https://rights.social/declaration)...But I digress. Back to tacos.

**If you want to see tacos, [check out the Taco Bell Divine](https://tacobell.divine.video/)**.

### AI Slop-Free

![Slop Free Divine](https://r2.primal.net/cache/0/8f/ce/08fce226c08f4a23c4d1c2779768fdfa3bae7480bdf27ea9fa586e4e3e72e4fb.jpg)

Sorry if I triggered anyone by using the AI word, but the times are a-changin' like Bob Dylan. I am not a trained artist. To be honest, I don't even know what I am doing. I draw and paint my own pictures because I am tired of seeing AI slop photos on the Internet and signs on fences around town. I prefer using my untrained, hand-made art than AI-made art without a soul. *Forget that*. I feel the same about AI video, which is one of the coolest Divine features: the app uses [ProofMode](https://gitlab.com/guardianproject/proofmode/simple-c2pa/) to filter out AI-generated video.

According to the website, Divine uses [ProofMode](https://proofmode.org/) to eliminate content made with artificial intelligence. According to the "About" page, it uses [OpenPGP](https://openpgp.org), [hashes](https://en.wikipedia.org/wiki/Cryptographic_hash_function), and [timestamps](https://en.wikipedia.org/wiki/Cryptographic_hash_function) to do this. I won't bore you with the math, and it actually uses a timestamp protocol I am not familiar with... so we'll just call it *magic AI detection math*. It's "Pretty Good," as in *Pretty Good Privacy*, but it's not perfect. If I made a video of an AI slop-poster affixed to a fence down the street, it will detect a real-world object and therefore slip through; but it will not allow you to upload a video from Luma or Kling. In fact, **ProofMode requires you to use the camera on your phone to do all this math, so you also can't upload previously made videos**. Some people complain about this, but there's no other way to filter out AI. You can always take a video of a video, however, [like I did with this video from Big Sur](https://marc26z.divine.video/video/dd9c297db6bb3d17be276a699adf0c85d5f7f917bd8a187b4ddea02dcfb03f2f?source=profile&pubkey=df478568479de26b4a83c1bdc4dbab61b5cc82e1a312e2b28bc815a12a951e67&index=24). Big Sur is beautiful, but there's almost no Internet service. Could I be lying and actually have made an AI video and then filmed it? Sure, but I didn't. I pinky swear. If you don't believe me, you can look at [this video from the Henry Miller Library](https://marc26z.divine.video/video/6dfc5437f66586a22efc83b3fb56cbf7345aeb6ea6499854617704da1e796a01?source=profile&pubkey=df478568479de26b4a83c1bdc4dbab61b5cc82e1a312e2b28bc815a12a951e67&index=44). It's possible I used AI to make the keyhole video, but you would have to believe I traveled to Big Sur, did not see the famous keyhole, and decided to use AI slop as a substitute. Or... I actually took the video. You decide. :)

#### Freedom Tech Is Free

Freedom tech is free (as in freedom, not free beer). If you create content for most corporate-owned social media companies, you are essentially giving your intellectual property to them. If you steal intellectual property from a corporation, they will sue you like the RIAA sued teenage Napster nerds. If you post on legacy social media, you are giving your intellectual property to a corporation. They won't let you share it with people without forcing them to give up an email or phone number. Then they will feed your words, videos, and photos to the AI overlords.

Divine is freedom tech. It does not feed your data to the AI overlords. The AI overlords like to steal though. Nothing can stop them, but the app is licenced under the Mozilla Public License 2.0. This is a permissive license. Sure, you can't use the Divine logo without permission, but you could fork the code and make a new app called AI Slopvine. *Please don't do this*. The world is full of slop-kind. Divine is designed for human-kind.

**Try [Divine](https://divine.video) today**. Available on the [App Store](https://apps.apple.com/us/app/divine-video/id6747959501), [Google Play](https://play.google.com/store/apps/details?id=co.openvine.app&hl=en_US), and [Zapstore](https://zapstore.dev/apps/co.openvine.app).**Tell your friends**.

Thanks for reading.

**npub1marc26z8nh3xkj5rcx7ufkatvx6ueqhp5vfw9v5teq26z254renshtf3g0**
**Website:** https://funwithfreedomtech.com/
**Block Height:** 963762
**Timestamp (UTC):** 2026-08-23T20:07:20Z
**Block Header:** 000000000000000000009e6e032821f69e4ccb7a84f73353dca5879d7a7d47de

[![Scan to tip](https://github.com/Marc26z/FunWithFreedomTech/blob/main/public/blog/images/ClickScanTip.jpg?raw=true)](lightning:funwithfreedomtech@getalby.com)

    
