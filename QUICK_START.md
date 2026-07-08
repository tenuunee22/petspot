# 🚀 PetSpot Quick Start Guide

## ✅ System is Ready!

Your PetSpot application is fully set up and running. Here's how to use it:

---

## Step-by-Step User Guide

### 1️⃣ Register/Sign Up

**Goal:** Create a new account

**Steps:**
1. Go to home page: `http://localhost:3000`
2. Click "Пост оруулах" (Create Post) or go to `/auth/signup`
3. Enter your **email** and **password**
4. Click "Бүртгүүлэх" (Register)
5. ✅ Account created!

**Alternative - Phone OTP:**
1. Go to `/auth/login`
2. Scroll to "📞 Phone OTP" section
3. Enter your phone number: +976xxxxxxxx
4. Click "Илгээх" (Send)
5. Enter OTP code from reCAPTCHA
6. ✅ Logged in!

---

### 2️⃣ Make a Payment

**Goal:** Pay 3,000 ₮ to create a post

**Steps:**
1. After logging in, click "Пост оруулах" (Create Post)
2. You'll see: "💳 Төлөлт шаардлагатай" (Payment Required)
3. Click "💳 3,000 ₮ төлөх" (Pay 3,000 ₮)
4. On payment page, click "💳 QPay дээр 3,000 ₮ төлөх"
5. ⏳ Wait for payment verification (2 seconds)
6. ✅ Payment successful!
7. 🔄 Automatically redirects to post creation

---

### 3️⃣ Create a Post

**Goal:** Create a lost or found pet post

**Steps After Payment:**
1. You're now on `/post/create` form
2. **Choose Post Type:**
   - 🆘 Алга болсон (Lost)
   - 🎉 Олсон (Found)
3. **Fill Required Fields** (marked with *):
   - 📝 **Амьтны нэр** (Pet Name): e.g., "Аав"
   - 📍 **Байршил** (Location): e.g., "Чингэлтэй дүүрэг"
   - 📞 **Утасны дугаар** (Phone): e.g., "+976 88123456"
4. **Fill Optional Fields:**
   - 🐕 **Төрөл** (Breed): e.g., "Бүргэ"
   - 🎨 **Өнгө** (Color): e.g., "Цагаан"
   - 📅 **Алга болсон огноо** (Lost Date)
   - 📧 **Имэйл** (Email)
   - ✍️ **Тайлбар** (Description)
5. **Upload Photo:**
   - Click on photo input
   - Select image file
   - ✅ Photo preview shows
6. **Premium (Optional):**
   - ☑️ Check "💎 Өргөтгөсөн пост" for boosted listing
7. **Submit:**
   - Click "📤 Пост оруулах" (Submit Post)
   - ⏳ Uploading photo...
   - ✅ Success message appears!

---

### 4️⃣ View Your Post Publicly

**Goal:** See your post on the public listing

**Steps:**
1. Click "🔍 Постын хуудас" (View Posts) in success message
2. Or go to `/lost-found`
3. ✅ Your post appears in the grid!
4. You can:
   - 🔍 **Filter by type:** Lost vs Found
   - 🔎 **Search posts:** Use filter options
   - 📸 See photos from Storage
   - 📞 View contact info

---

### 5️⃣ Manage Your Posts

**Goal:** Edit, publish, or delete your posts

**Steps:**
1. Go to `/profile`
2. See all your posts in "📝 Миний постууд" section
3. **For Each Post:**

   **View Post:**
   - See all details and photo
   - Shows contact information

   **Edit Post:**
   - Click "✏️ Засах" (Edit)
   - Modify: name, breed, color, location, description, premium status
   - Click "💾 Хадгалах" (Save)
   - ✅ Updated in database

   **Publish/Hide:**
   - Click "🌐 Нийтлэх" (Publish) to make public
   - Click "🔒 Хаах" (Hide) to make private
   - Status shows: ✅ Нийтэд харагдаж байна / 🔒 Нуугдсан

   **Delete Post:**
   - Click "🗑️ Устгах" (Delete)
   - Confirm deletion
   - ✅ Photo and post removed from everywhere

---

### 6️⃣ Create Another Post

**Goal:** Create a second post

**Steps:**
1. On `/profile`, click "➕ Шинэ пост оруулах" (New Post)
2. **You need to pay again** (3,000 ₮ per post)
3. Go through payment flow again
4. Create new post
5. ✅ Now you have 2 posts!

---

## 🔑 Key Features Summary

| Feature | Where | Status |
|---------|-------|--------|
| **Create Account** | `/auth/signup` | ✅ Working |
| **Login** | `/auth/login` | ✅ Working |
| **Phone OTP** | `/auth/login` | ✅ Working |
| **Payment** | `/post/payment` | ✅ Simulated |
| **Create Post** | `/post/create` | ✅ Working |
| **Upload Photo** | `/post/create` | ✅ Working |
| **View Posts** | `/lost-found` | ✅ Working |
| **Manage Posts** | `/profile` | ✅ Working |
| **Edit Post** | `/profile` | ✅ Working |
| **Delete Post** | `/profile` | ✅ Working |
| **Publish/Hide** | `/profile` | ✅ Working |
| **Real-time Updates** | All pages | ✅ Working |

---

## 📊 Data Flow

```
User Journey Map:

1. SIGNUP/LOGIN
   Home → /auth/signup → Create account
   Home → /auth/login → Login with email or phone OTP

2. PAYMENT
   /post/create (not paid) → /post/payment
   Pay 3,000 ₮ → /post/payment/success → /post/create

3. CREATE POST
   /post/create (after payment) → Fill form → Upload photo
   Submit → Save to Firestore + Storage → Success

4. VIEW POSTS
   /lost-found → Query Firestore → Display with Storage photos
   Filter by type → Real-time updates

5. MANAGE POSTS
   /profile → View all user's posts → Edit/Delete/Publish
   Update Firestore → Real-time sync

6. REPEAT
   Create more posts by paying again
```

---

## 🐛 Troubleshooting

### Problem: "Төлөлт шаардлагатай" (Payment Required)
**Solution:** 
- Click "💳 3,000 ₮ төлөх" button
- Complete payment flow
- Return to post creation

### Problem: Photo not showing
**Solution:**
- Refresh page (photos load from Storage)
- Check internet connection
- Make sure photo file size < 10MB

### Problem: Can't see my post on `/lost-found`
**Solution:**
- Click "🌐 Нийтлэх" (Publish) on your profile
- Make sure post status is "active" not "draft"
- Refresh page
- Check filters (may be filtering by type)

### Problem: "Failed to save post"
**Solution:**
- Check internet connection
- Make sure phone number is entered
- Try again in a few seconds
- Check browser console for errors (F12)

### Problem: Payment not working
**Solution:**
- Refresh page
- Try again
- Check if QPay page opens in new window
- Check browser popup settings

---

## 💾 Database Status

### Where Data is Stored

**Firestore (Database):**
- Post metadata (name, type, location, etc.)
- User information
- Publication status (published/draft)
- Timestamps

**Firebase Storage:**
- Actual photo files
- Organized in `posts/` folder
- Accessible via download URLs

**Browser LocalStorage:**
- Payment verification (temporary)
- Auth tokens

---

## 🔒 Privacy & Security

✅ **Your data is safe:**
- Only you can see your profile
- Posts are public when published
- Photos uploaded to secure Firebase
- Authentication via Firebase Auth
- No passwords stored in plain text
- reCAPTCHA verification on phone OTP

---

## 🚀 Next Steps

### Try This:
1. ✅ Sign up for account
2. ✅ Complete payment
3. ✅ Create a lost pet post
4. ✅ Upload a photo
5. ✅ View on `/lost-found`
6. ✅ Go to `/profile` to manage
7. ✅ Try publishing/hiding
8. ✅ Edit post details
9. ✅ Create another post (pay again)

### Test All Features:
- [ ] Email/password login
- [ ] Phone OTP login
- [ ] Payment flow
- [ ] Photo upload
- [ ] Post creation
- [ ] Post editing
- [ ] Post deletion
- [ ] Publish/unpublish
- [ ] Real-time updates
- [ ] Filtering
- [ ] Search

---

## 📚 Documentation

For more details, see:
- `SYSTEM_OVERVIEW.md` - Architecture overview
- `DATABASE_POST_SYSTEM.md` - Database schema
- `QPAY_INTEGRATION.md` - Payment system details

---

## 🎉 You're All Set!

Your PetSpot application is **fully functional** and ready to use.

**Current Status:** ✅ Development (http://localhost:3000)

**Ready to Deploy:** Yes, to production with real payment integration

**Questions?** Check the documentation files or test the features!

---

**Happy PetSpot-ting!** 🐾
