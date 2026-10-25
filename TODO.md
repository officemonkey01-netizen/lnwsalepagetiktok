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

## หน้า public และการส่งมอบ
- [x] รองรับ route `/p/:slug` สำหรับหน้า public ตาม slug
- [x] ปุ่มลิงก์เปิด URL จริงในแท็บใหม่และมี visual feedback
- [x] เพิ่ม route manifest และ metadata สำหรับแบรนด์
- [ ] ต่อ authentication และ Managed Database สำหรับ multi-user production
- [ ] ต่อ upload รูปภาพผ่าน Managed Storage และ custom domain
- [ ] ต่อ Pixel/analytics จริงและระบบ package/billing
