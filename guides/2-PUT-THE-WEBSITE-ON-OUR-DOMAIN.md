# Guide 2: Put the new website on our own domain

**Goal:** when someone types **aakashpathlab.com** they see this new website, not the old WordPress one.
*(If the domain is written differently in GoDaddy, use that spelling everywhere below.)*

**How it works, in plain words.** A domain name is just an address. Right now the address points to the old WordPress computer. We will change it to point to GitHub's computers, which hold the new website. Changing an address is done in GoDaddy, in a page called **DNS**.

There are **two people** and **three parts**:

| Part | Who | Time |
|---|---|---|
| A. Switch the website on at GitHub | The **designer** (owner of the GitHub project) | 5 minutes, once |
| B. Change the address at GoDaddy | The **person with the GoDaddy login** | 15 minutes, then wait |
| C. Finish and check | Both | 10 minutes |

Read the whole guide once before you start. Do the steps **in order**.

> **Before anything else:** upload the real photos first (Guide 1). It is much easier to do that before the domain switch.

---

## Part A. The designer switches the website on at GitHub (once)

Only the owner of the GitHub project can change these settings. The person who uploads photos cannot.

### A1. Invite the person who will upload photos

1. Open **https://github.com/isha-chhabra/apl-website**.
2. Click **Settings** (top row of tabs).
3. In the left menu click **Collaborators**.
4. Click **Add people**, type their GitHub username or email, pick them, and click **Add**.
5. They get an email. They must click **Accept invitation** in that email.

(They need a free GitHub account first: go to https://github.com/signup and follow the steps.)

### A2. Turn on the website

1. Still in **Settings**, click **Pages** in the left menu.
2. Under **Build and deployment**, find **Source**. Choose **Deploy from a branch**.
3. Under **Branch**, choose **main**. In the box next to it choose **/ (root)**.
4. Click **Save**.
5. Wait about 2 minutes and refresh the page. A message appears near the top: **"Your site is live at https://isha-chhabra.github.io/apl-website/"**.
6. Open that link. You should see the website. This is the temporary address. It works even before the domain is switched.

### A3. Tell GitHub our domain name

1. Still on the **Pages** settings page, find the box **Custom domain**.
2. Type: `aakashpathlab.com` (no `www`, no `https://`).
3. Click **Save**.
4. GitHub may show a red message: **"DNS check unsuccessful"**. That is normal. It turns green after Part B.

Now tell the person with the GoDaddy login that Part A is done. Also tell them your GitHub user name. In this project it is `isha-chhabra`. They need it in step B4.

---

## Part B. Change the address at GoDaddy

**Who:** the person who can sign in to GoDaddy for our domain.

**Important. Read this first**

- You will only change **two kinds of records**: the ones named **@** (type **A**) and the one named **www** (type **CNAME**).
- **Do not delete** any record of type **MX**, **TXT**, **NS** or **SOA**. Those keep our email and the domain itself working.
- Do **not** cancel the old WordPress hosting yet. Cancel it only when the designer says so, after everything works.
- GoDaddy sometimes changes how its pages look. If a button has a slightly different name, look for the same words.

### B1. Sign in and find the DNS page

1. Go to **https://www.godaddy.com** and click **Sign in** (top right).
2. Click your name (top right), then **My Products**.
3. Find **aakashpathlab.com** in the list. Click the **DNS** button next to it. (If you do not see it, click the domain name, then click **DNS** or **Manage DNS**.)

You now see a table of records with the columns **Type**, **Name**, **Data** (or **Value**), and **TTL**.

### B2. Take a photo of the old records

Before changing anything, take a screenshot of the whole table (on Windows: press **Windows + Shift + S**). If something goes wrong, the designer can put things back.

### B3. Delete the old website records

Delete **only** these:

1. Every row with Type **A** and Name **@**. (The Data might be a number like `160.153.x.x`, or the word **Parked**.)
2. The row with Type **CNAME** and Name **www**.

To delete a row: click the **pencil** or **three dots** at the end of the row, then click **Delete**, then confirm.

If GoDaddy shows a **"Domain forwarding"** or **"Forwarding"** box near the top of the DNS page, remove it too (click **Remove** or **Delete**).

### B4. Add the new records

Add **five** records. For each one: click **Add New Record** (or **Add**), fill in the boxes exactly as below, then click **Save**.

**Four "A" records**

| Type | Name | Data / Value | TTL |
|---|---|---|---|
| A | `@` | `185.199.108.153` | 1 Hour |
| A | `@` | `185.199.109.153` | 1 Hour |
| A | `@` | `185.199.110.153` | 1 Hour |
| A | `@` | `185.199.111.153` | 1 Hour |

**One "CNAME" record**

| Type | Name | Data / Value | TTL |
|---|---|---|---|
| CNAME | `www` | `isha-chhabra.github.io` | 1 Hour |

(`isha-chhabra` is the designer's GitHub user name. Use exactly the name the designer told you. Type the value in small letters. Do not add `https://`.)

Check the table again. You should now see **four** A records named `@` and **one** CNAME named `www`, plus the MX/TXT/NS records that were there before.

### B5. Wait

The change takes **from 10 minutes to a few hours** to reach everyone. It can take up to a day in rare cases. Do not keep changing things. Waiting is normal.

To check progress, open **https://dnschecker.org**, type `aakashpathlab.com`, choose **A** in the drop-down, and click **Search**. When most rows show `185.199.108.153` (or the other three numbers), the change has reached them.

---

## Part C. Finish and check

### C1. Look at the website

Open a new browser window and go to:

- `http://aakashpathlab.com`
- `http://www.aakashpathlab.com`

Both should show the new website. If you still see the old WordPress site, wait longer (see B5) and press **Ctrl + F5**. You can also try on your phone using mobile data (not Wi-Fi).

### C2. Turn on the padlock (HTTPS). The designer does this.

1. Open the project on GitHub, then **Settings**, then **Pages**.
2. Wait until the red "DNS check" message turns into a green tick. This may take an hour after Part B.
3. Tick the box **Enforce HTTPS**. (If the box is grey, wait 30 minutes and refresh. GitHub is preparing the certificate.)
4. Now `https://aakashpathlab.com` shows a padlock in the browser.

### C3. Final check

Open **https://aakashpathlab.com** on a phone and click through every page: Home, About, Tests & Packages, FAQs, Gallery, CSR, Contact. Try the search box on the home page. Tell the designer it is finished.

Only after that, the designer decides when to cancel the old WordPress hosting.

---

## If something goes wrong

| What you see | What to do |
|---|---|
| GitHub says "DNS check unsuccessful" and it has been more than a day | Look at the GoDaddy table again. There must be exactly four A records named `@` with the four numbers above, and one CNAME named `www` with the GitHub name. Check every character. |
| The old WordPress site still shows | Wait longer. Then press **Ctrl + F5**. Then try a phone on mobile data. |
| "Not secure" or a certificate warning | The padlock (C2) is not switched on yet. Wait an hour, then the designer does C2. |
| The **Enforce HTTPS** box stays grey | Wait 30 minutes, refresh the page. If still grey after a day, remove the custom domain in GitHub, save, add it again, save. |
| Our email stopped working | Something in the DNS table was deleted by mistake. Use your screenshot from B2 to put the **MX** and **TXT** records back, or send the screenshot to the designer. |
| Anything else | Take a screenshot of the screen and send it to the designer. Do not try random things. |
