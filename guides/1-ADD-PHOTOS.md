# Guide 1: Add our real photos to the website

**Who this is for:** the person who adds photos.
**How long it takes:** about 10 minutes once the photos are ready.
**What you need:** a computer, a free GitHub account, and access to this project (the designer will invite you).

The website already has pretend (stock) photos in every place a real photo goes. You will replace them. You do this by uploading a photo **with exactly the same file name** as the one it replaces. The website finds photos by their file name, so the name is the most important thing.

---

## Part A. Get the photos ready

### 1. Check which photos we need

Open the table at the bottom of this guide, called **"Where each photo goes"**. Every photo has a fixed file name. Write down or print which photos you have.

### 2. Make the photos small and the right type

Big photos make the website slow, so shrink each one first.

1. Open **https://squoosh.app** in your browser (it is free, nothing to install).
2. Drag one photo into the page.
3. On the right side, under **Compress**, choose **MozJPEG**. Set **Quality** to **75**.
4. Also on the right, tick **Resize**. Set **Width** to **1600**. Leave the height as it is.
5. Click the **download** button (bottom right) and save the file.
6. Repeat for every photo.

A finished photo should be **under 500 KB**.

### 3. Give every photo its exact file name

The name must be **exactly** as written in the table:

- all small letters (lowercase)
- no spaces
- ends in a small-letter type: **.jpg**, **.webp** or **.png** (not `.JPG`). If a photo with the same number but a different type already exists, delete the old one first
- the number must have the zeros, for example `facility-01.jpg` (not `facility-1.jpg`)

**Windows tip.** If you cannot see the `.jpg` part of file names: open the folder, click **View** at the top, then **Show**, then tick **File name extensions**. Now you can see and fix the full name.

Right-click a file, choose **Rename**, type the new name, press **Enter**.

---

## Part B. Upload the photos

### 1. Sign in and open the project

1. Go to **https://github.com** and click **Sign in**.
2. Open **https://github.com/isha-chhabra/apl-website** (if you see "404", you are not signed in, or the designer has not invited you yet).

### 2. Open the photos folder

1. Click the folder named **assets**.
2. Click the folder named **photos**.

The doctor's photo is **not** in this folder. It is one step back, inside **assets** (see Part C).

### 3. Upload

1. Click the **Add file** button (top right, next to the green **Code** button).
2. Click **Upload files**.
3. Drag all your photos into the big box. (Or click **choose your files** and select them.)
4. Wait until every file name is listed under the box.

### 4. Save ("commit")

1. Scroll down to **Commit changes**.
2. In the first box, type: `Add photos`
3. Click the green **Commit changes** button.

That is the whole upload. If a photo with that name already existed, the new one replaces it. This is what you want.

### 5. Look at the website

1. Wait **2 minutes**. The website updates by itself.
2. Open the website (ask the designer for the link if you do not have it).
3. Press **Ctrl + F5** (on a Mac: **Cmd + Shift + R**). This forces the newest version to show.
4. Check the **Gallery** page, the **CSR** page and the **About Us** page.

If a photo did not change, its file name is not exactly right. Go back to Part A, step 3.

---

## Part C. The doctor's photo

This one goes in a **different folder**.

1. On the project page, click **assets** (stay in **assets**, do not open **photos**).
2. Click **Add file**, then **Upload files**.
3. Drag in the doctor's photo. Its name must be exactly **`dr-chhabra.jpg`**.
4. Type `Doctor photo` in the commit box and click **Commit changes**.

---

## Removing a photo we do not have

The Gallery shows every `facility-` photo that exists. If you only have 4 real facility photos, the 2 extra pretend ones must be deleted, or they will stay on the website.

1. Open **assets**, then **photos**.
2. Click the file you want to remove (for example `facility-05.jpg`).
3. Click the **three dots (...)** at the top right of the picture.
4. Click **Delete file**.
5. Click the green **Commit changes** button.

Do not delete `csr-1.jpg` to `csr-5.jpg`. The CSR page needs all five.

The **instrument** photos work the other way round. Right now they show a small picture icon. When you upload `instrument-03.jpg`, the icon in that spot turns into your photo.

---

## Where each photo goes

### Gallery, "Lab Facility" tab
Any photos of the lab itself. Any shape is fine (they are cropped to a square).

| File name | Notes |
|---|---|
| `facility-01.jpg` to `facility-12.jpg` | Up to 12. A number with no file is skipped. Numbers do not need to be in a row. |

### Gallery, "Lab Instruments" tab
One photo per machine. The number is the machine's place in the list.

| File name | Machine |
|---|---|
| `instrument-01.jpg` | Sysmex 3-Part Cell Counter |
| `instrument-02.jpg` | Fully Automated Urine Analyser |
| `instrument-03.jpg` | Microscope Olympus CX21i |
| `instrument-04.jpg` | Fully Automated 5-Part Cell Counter XS-800i |
| `instrument-05.jpg` | Fluorescence Immunochromatographic Analysing System (FINECARE) |
| `instrument-06.jpg` | Ion Selective Electrode Analyser, NULYTE |
| `instrument-07.jpg` | Fully Automated Nephelometer, Mispa i3 |
| `instrument-08.jpg` | Semi Autoanalyser ERBA Chem 5 Plus |
| `instrument-09.jpg` | Fully Automated Biochemistry Analyser, EM 200 |
| `instrument-10.jpg` | Chemiluminescence-Based Hormone Analyser, Beckman Coulter Access 2 |
| `instrument-11.jpg` | ERBA ECL 105 Coagulometer |
| `instrument-12.jpg` | Nano H5 HPLC System |
| `instrument-13.jpg` | Sysmex CA101 Coagulometer |
| `instrument-14.jpg` | Laser-Based Vein Viewer |
| `instrument-15.jpg` | Mispa Nanoplus, Fully Automatic Biochemistry Analyser |

Photos look best when the machine fills the picture, in landscape (wider than tall).

### CSR page (all five are needed)

| File name | Card on the CSR page |
|---|---|
| `csr-1.jpg` | Support for the LGBTQIA+ Community |
| `csr-2.jpg` | Treatment Support for a Young Patient |
| `csr-3.jpg` | Food Security for Women and Children |
| `csr-4.jpg` | Road Safety with the Traffic Police |
| `csr-5.jpg` | Holding the Line During COVID-19 |

Landscape photos (wider than tall) work best here.

### About Us and home page (in the **assets** folder, not **photos**)

| File name | What it is |
|---|---|
| `dr-chhabra.jpg` | Dr. Akash Chhabra. Shown on the home page and the About page. |

### Do not change
`logo.png` (the logo). It is already correct.

---

## If something goes wrong

- **The photo did not change:** the file name is not exactly right, or you have not pressed Ctrl + F5.
- **You uploaded to the wrong place:** do nothing and tell the designer. It is safe. Nothing can break the website from a wrong photo.
- **You see a message you do not understand:** take a screenshot and send it to the designer.
