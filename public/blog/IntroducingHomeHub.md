# Home Hub: A Free, Encrypted Family Budget & Chore App on Nostr

I do most of the chores in my house. I also take care of all the bills. I decided I needed to create an app to help me do this. These grocery prices are getting out of control. I have used automated budgeting apps in the past, but they suck.  

The app can be found at [homehub.shakespeare.diy](https://homehub.shakespeare.diy/). I wrote an article about Shakespeare [here](https://habla.coracle.social/a/naddr1qvzqqqr4gupzph68s45y080zdd9g8sdacnd6kcd4ejpwrgcju2eghjq45y4f28n8qqw8v6tzv5kkxmmyd9hxwtthd96xsttndpskketnwpjkzun95p0w3p), but a lot has changed in the world of AI since then. AI has improved. I used to spend a lot more tokens trying to fix slop. The newer models don't have much slop — it's amazing, honestly. A few years ago I could barely write `print("Hello world!")`. Now I can build a full website by writing a few paragraphs. I can also ask the model to help me design. It's better to stay humble and ask questions than waste a bunch of sats on sycophantic hallucinations. This app took me approximately two hours to make, but it's my second draft — I had to scrap the first one because I wasn't humble enough and thought I could design everything myself. That's not the way. It's better to collaborate with the AI and get feedback before you screw anything up. That's what I've learned so far, anyway.

## Why I Built an Encrypted Budget App Instead of Using a Bank

I can't tell you how many times I've heard someone say on a podcast that **they built something to scratch their own itch**. That was the principle I used to design Home Hub. I wanted an app that could help me manage my budget and keep up with cleaning the bathrooms. It's not a glamorous job, but somebody's got to do it. If it isn't me — staying humble and cleaning toilets — I'm going to need to pay someone else to do it, and I'd rather stack sats. That's why I wrote this prompt initially:

`What would be the best way to create a budget app? I want it encrypted and shareable with family members. I also want it to have a grocery list I can share. Which NIPs should I use — NIP-44, NIP-59, NIP-78 kind 30078, NIP-51 lists, and a NIP-07 login?`

That was a pretty good start, but then I remembered something: my wife will never write down an nsec or use the Amber app. It just isn't going to happen — to think otherwise is delusional. I borrowed this idea from the [Glow wallet](https://wordstr.funwithfreedomtech.com/blog/npub1marc26z8nh3xkj5rcx7ufkatvx6ueqhp5vfw9v5teq26z254renshtf3g0/the-glow-app-makes-bitcoin-for-everybody), which uses a Google passkey. Once someone (who shall remain nameless) showed it to me, I decided I needed to use it too. Besides, this is for a convenient Nostr login, not money. Wisp — not Dark Wisp — does the same thing. This is an example of software built for [normal people](https://njump.to/nevent1qqs0gf57ezn5x3mfjnyms5k8xdn4g5yy9v4sws0n2t8pxhrnzyrqq6cpr4mhxue69uhkummnw3ezucnfw33k76twv4ezuum0vd5kzmp0qgsvrg09ectp2l2hxf0gwg3y25q8qmzkn8qfxcvgtfre4jlfknjzm6crqsqqqqqpwljtn2).

## Ask AI For Advice, Not Slop

![calendar](https://raw.githubusercontent.com/Marc26z/FunWithFreedomTech/70a051424fa8c867364c15d63b7eddfe59e4cbdc/public/blog/images/cal.png)

Rick Rubin has a commercial for the Teknogramaton podcast where they talk about using Claude to bounce off ideas, like a philosopher on the Stoa. It gave me the idea to ask Claude for suggestions on the site. What would a normal person want? The answer wasn't a lightning address that lets you send money to your bill-paying account like email — too bad, I really like that idea, but normal people don't know what the hell that is. Claude suggested I add medication reminders and a travel section. Here's what I wrote:

```
Here are some things needed to manage a household:
Budget
Groceries
Chores
Home maintenance
Yard work
Doctor appointments
Activities such as music lessons
Can you think of anything else that might need to be managed?
```

Here's what [Claude AI suggested](https://njump.to/nevent1qqspph5qlcfk2ax0sy59lrcpk46k2ey5vkmsq74vjva8htupv2ngzwspr4mhxue69uhkumnw3ezucnfw33k76twv4ezuum0vd5kzmp0qgs9d25us5eotherpevujjcyu8rv7rsh5f97523hryqy06heu29eyx6gct9y5srqsqqqqqpv670sk).

I didn't implement everything — these AI Chuck E. Cheese tokens cost real money (sats). I took some of the best ideas and built those. I originally set out to create a budget and grocery list, and it's since expanded to other things. I thought the calendar was a great idea, so I had my clanker make it. I also have a permissions system: one key lets certain people see everything, and another restricts what they can see. I want my son to be able to add milk to the grocery list — I do not want him creating a monthly $1,000 video game budget. He also doesn't need to see which medications other family members take. It's not that I'm ashamed of any medications I take, but some people need serious drugs, and it's not wise to let your teenager know you're on prescription pain meds. You might only need them for a week, but you don't want the kids finding out there are extra opioids in the house.

### How To Set A Budget Without Adding Another Subscripotion

![budget](https://raw.githubusercontent.com/Marc26z/FunWithFreedomTech/57a38f6b10e25aaaa4260b3f0ae2806a0320c781/public/blog/images/budget.png)

The dollar ain't what it used to be. Inflation isn't just something your grandmother talks about anymore. So it's time to get back to the basics. I'd like to add sats to my budget, but that isn't something most people want — even most bitcoiners are on the fiat standard. I get my paycheck converted to bitcoin, but the rest of my family isn't so orange-pilled; they prefer the "number go down" technology that doesn't bounce around relative to their favorite unit of account. My family included.

There are apps that can help you with budgeting. The problem is they cost money every month. That informationcan also be used against you to market mortgages or whatever. This budget has none of that. I can't see your budget anyway. I don't know how much you spend on adult toys and I don't know if you qualify for a mortage because it's none of my business. Since Home Hub encrypts the budget, noe of that information can be used against you. Why pay some corporation a monthly subsription for them to convince you to spend more money? With HomeHub, you don't have to.

That's one reason my budget is on the fiat standard. I thought about adding a sats field, but even most bitcoiners would prefer the dollar, judging by all the fiat price talk on X (Twitter). Not to mention, all my bills are priced in fiat — converting them to sats is a pain in the asterisk. Besides, I use the [Opportunity Cost extension](https://chromewebstore.google.com/detail/opportunity-cost/pfhbigpmdnngoebopkigaocjcabbibil) to scratch that itch.

I've used automated budgeting tools before, but they don't work for me. There's something about taking the time to enter your spending by hand that just can't be beat. Most of the time I pay with credit cards, and the cashiers often toss the receipt without even asking. Am I just supposed to be kept in the dark about these charges? That seems ridiculous, so I'd rather enter everything I spend into my own app than trust the banks. I know, that makes me a weirdo these days.

The cool thing is I have a key I can share with my wife. Satoshi said bitcoin might be good for dudes who want to buy porn and hide the credit card bill, but that's not how my marriage works. I decided to be totally financially transparent with my wife. The trouble is she doesn't give a damn about bitcoin, which makes it hard to show her our finances, given that our joint bank account doesn't want to store my money. I'm also not keen on letting them store anything other than what I use to pay bills.

#### Try Home Hub Today

![hand drawn home hub logo](https://raw.githubusercontent.com/Marc26z/FunWithFreedomTech/d03f715b824f56791f8bf1e9fff6d22b1d32a676/public/blog/images/homeHubHandDrawn.png)
[Click here to try Home Hub](https://homehub.shakespeare.wtf/). I drew the logo by hand but changed the colors using AI. It still looks human-made, which is how I like it, but it's cleaner than my scribbles. The internet is full of AI slop — photos that all look the same. I want my logos to look hand-drawn, even if they're rough, because that makes them different. AI can make some amazing pictures — the Seinfeld videos are pretty good — but AI can't make human-made art. That's still a skill only humans have. I prefer my bad art to AI slop. Practice makes perfect, though; I've noticed my art getting better just from doing it more.

Try Home Hub today. Hopefully you find it useful. If you do, send sats, tell your friends — they need a budget. **Fiat isn't getting any more valuable.**

**npub1marc26z8nh3xkj5rcx7ufkatvx6ueqhp5vfw9v5teq26z254renshtf3g0**
**Website:** https://funwithfreedomtech.com/
**Block Height:** 966227
**Timestamp (UTC):** 2026-09-09T15:13:23Z
**Block Header:** 00000000000000000002189d622224463a0cbcc79d39444447bcea4f3e340248

[Subscribe With Sats](https://zapplanner.albylabs.com/confirm?amount=2100&recipient=funwithfreedomtech@getalby.com&timeframe=30d&comment=FWFT%20signal%20tier&returnUrl=https://funwithfreedomtech.com/subscribed)
