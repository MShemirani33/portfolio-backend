import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";

// مسیر پوشه‌ی آپلود
const uploadsDir = path.join(__dirname, "uploads");

// ذخیره‌ی هش‌ها برای مقایسه
const hashes = new Map<string, string>(); // hash -> filename
let deletedCount = 0;

const files = fs.readdirSync(uploadsDir);

for (const file of files) {
  const filePath = path.join(uploadsDir, file);
  const stat = fs.statSync(filePath);

  // اطمینان حاصل کنیم که فقط فایل بررسی می‌شه
  if (!stat.isFile()) continue;

  // محاسبه هش فایل
  const fileBuffer = fs.readFileSync(filePath);
  const hash = crypto.createHash("sha256").update(fileBuffer).digest("hex");

  // بررسی هش تکراری
  if (hashes.has(hash)) {
    // اگر این هش قبلاً دیده شده، یعنی تکراریه → حذفش کن
    fs.unlinkSync(filePath);
    console.log(`🗑 حذف شد: ${file}`);
    deletedCount++;
  } else {
    hashes.set(hash, file);
  }
}

console.log("\n🎉 پاکسازی کامل شد!");
console.log(`✅ تعداد فایل باقی‌مانده: ${hashes.size}`);
console.log(`🗑 تعداد فایل حذف‌شده: ${deletedCount}`);
