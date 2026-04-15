import multer from "multer";
import path from "path";

// تحديد مكان التخزين واسم الملف
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // تأكد من إنشاء مجلد اسمه uploads في جذر المشروع
  },
  filename: (req, file, cb) => {
    // حفظ الصورة باسم فريد (الوقت الحالي + اسم الملف الأصلي)
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// تصفية الملفات (قبول الصور فقط)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed (jpg, jpeg, png)"), false);
  }
};

export const upload = multer({ storage, fileFilter });
