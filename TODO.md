# TODO — lnwsalepagetiktok

## แดชบอร์ดจัดการเซลเพจ
- [x] แสดงแบรนด์ `lnwsalepagetiktok` และเมนูหลักภาษาไทยใน sidebar แบบ responsive
- [x] แสดงภาพรวมจำนวนหน้า, visits, CTR และยอดขายพร้อมการ์ดสถิติ
- [x] แสดงรายการเซลเพจที่มีชื่อ, slug, สถานะ, วันที่แก้ไข, visits และ CTR
- [x] สร้างหน้าใหม่, แก้ไข, ลบ และเปิดหน้า public จากรายการ

## ตัวแก้ไขเซลเพจ
- [x] แก้ไขชื่อหน้า/ร้าน, คำอธิบาย, โน้ตส่วนตัว และ slug
- [x] ตั้งค่าเว็บไซต์หลัก, CTA และปุ่มลิงก์หลายรายการ
- [x] เพิ่ม/ลบ/เลื่อนลำดับปุ่มลิงก์ และเลือก conversion event เบื้องต้น
- [x] เลือกธีมและสีแบรนด์ พร้อมสลับสถานะเผยแพร่
- [x] แสดง live preview ในกรอบมือถือและเปิดพรีวิวหน้า public
- [x] บันทึกข้อมูลบน localStorage เพื่อให้ flow ใช้งานได้ทันทีบน static hosting

## ฟังก์ชันสั่งซื้อในหน้า public
- [x] ปุ่ม CTA หลักและปุ่มที่มี event `purchase`/`initiate_checkout` เปิด checkout modal ในหน้าเดียว
- [x] เก็บชื่อผู้รับ, เบอร์โทรศัพท์, ที่อยู่จัดส่ง, จำนวนสินค้า และวิธีชำระเงิน
- [x] ตรวจ required fields ก่อนยืนยัน, สร้างเลขออเดอร์ และบันทึกออเดอร์ใน localStorage
- [x] แสดงหน้าสำเร็จพร้อมเลขคำสั่งซื้อและข้อความติดต่อลูกค้า
- [ ] ต่อ API/Managed Database, payment gateway และระบบแจ้งเตือนสำหรับ production commerce

## หน้า public และการส่งมอบ
- [x] รองรับ route `/p/:slug` สำหรับหน้า public ตาม slug
- [x] ปุ่มแชร์คัดลอก URL และปุ่มสั่งซื้อบน public navigation
- [x] เพิ่ม route manifest และ metadata สำหรับแบรนด์
- [x] ต่อ Manus OAuth ให้ dashboard/editor ต้อง login ก่อนใช้งาน และแสดงสถานะ logged-out อย่างชัดเจน
- [x] ย้าย source of truth ของเซลเพจจาก localStorage ไป Managed MySQL/Drizzle/tRPC โดยผูกข้อมูลกับเจ้าของ workspace
- [x] ให้หน้า public อ่านเฉพาะเซลเพจที่มีสถานะเผยแพร่แล้ว และให้ผู้ชมเข้าถึงได้โดยไม่ต้อง login
- [x] บันทึกคำสั่งซื้อ public ลงฐานข้อมูลถาวรพร้อม order id, ข้อมูลลูกค้า, จำนวน, วิธีชำระเงิน และสถานะเริ่มต้น
- [x] ต่อ Vercel frontend กับ Manus API ผ่าน rewrite เพื่อไม่ให้หน้า production เป็น static wrapper ที่ไม่มี backend
- [ ] ต่อ upload รูปภาพผ่าน Managed Storage และ custom domain
- [ ] ต่อ Pixel/analytics จริงและระบบ package/billing

## เอกสารและการนำเสนอ
- [ ] สร้างสไลด์นำเสนอฟีเจอร์และวิธีใช้งานแบรนด์ lnwsalepagetiktok
- [ ] สร้าง reusable skill สำหรับ workflow สร้าง/อัปเกรด Sale Page Builder
