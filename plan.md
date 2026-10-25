# lnwsalepagetiktok — แผนพัฒนาเว็บจัดการเซลเพจ

## ขอบเขตผลิตภัณฑ์
สร้างแดชบอร์ดภาษาไทยสำหรับเจ้าของร้าน/นักการตลาดเพื่อสร้างและจัดการเซลเพจหลายหน้า โดยยึดโครงสร้างจากไฟล์ต้นแบบที่ผู้ใช้แนบมา แต่ใช้แบรนด์ `lnwsalepagetiktok` ของผู้ใช้เองทั้งหมด

## แนวทางการทำงาน
- Frontend: React + TypeScript + Wouter + tRPC client จาก starter เดิม
- Production persistence: เก็บเซลเพจใน Managed MySQL ผ่าน Drizzle/tRPC โดยผูกทุกแถวกับ Manus OAuth `openId`; localStorage ไม่ใช่ source of truth อีกต่อไป
- Authentication: ใช้ Manus OAuth ตาม starter และ protected procedures สำหรับ dashboard/editor; หน้า `/p/:slug` เป็น public ได้เฉพาะรายการที่เผยแพร่แล้ว
- Orders: รับคำสั่งซื้อผ่าน public tRPC mutation และบันทึกลง `salePageOrders` พร้อมสถานะ `pending_confirmation`; ยังไม่อ้างว่าเป็น payment gateway จนกว่าจะต่อ provider จริง
- Hosting: Manus server เป็น API/database runtime; Vercel Git-connected frontend ใช้ rewrite `/api/*` ไปยัง Manus published server จึงคง URL แบรนด์ไว้โดยไม่ทำให้ข้อมูลกลายเป็น static-only
- Routes: `/` แดชบอร์ด, `/editor/:id` ตัวแก้ไข, `/p/:slug` หน้า public, `/404` not found
- หน้าใหม่เริ่มว่างสำหรับบัญชีจริง; seed เดิมใช้เฉพาะ fallback/ตัวอย่าง ไม่เขียนทับข้อมูลเจ้าของเมื่อ server มีข้อมูลแล้ว

## Design

### สไตล์ที่พิจารณา
- **Warm editorial commerce — 0.08:** อบอุ่นและดูพรีเมียมแบบสตูดิโอครีเอทีฟ
- **Creator command center — 0.07:** แดชบอร์ดคมชัดสำหรับครีเอเตอร์และนักยิงแอด
- **Neon social commerce — 0.06:** สีจัดและพลังโซเชียลแบบ TikTok

เลือกใช้ **Creator command center** ผสมโทนอุ่นของแบรนด์ เพื่อให้ใช้งานจริงได้นานและไม่แย่งความสนใจจากข้อมูล

- **Design Movement:** Modern creator SaaS / editorial dashboard ที่มีขอบมนเล็กน้อยและการแบ่งพื้นที่แบบแถบคำสั่งด้านซ้าย
- **Core Principles:** ชัดเจนก่อนสวย, งานสำคัญอยู่เหนือ fold, สีใช้เพื่อบอกสถานะ, ทุก action ต้องให้ feedback ทันที
- **Color Philosophy:** พื้นหลังครีมอ่อนให้ความรู้สึกเป็นเจ้าของและเป็นมิตร ตัดด้วย navy สำหรับความน่าเชื่อถือ และ coral-orange เป็นสีแบรนด์ที่สื่อถึงปุ่มซื้อ/การเคลื่อนไหวของคอนเทนต์
- **Layout Paradigm:** Sidebar แบบคงที่ + content canvas แบบแยกเป็นแผง ไม่ใช้กริดการ์ดที่เท่ากันทั้งหมด
- **Signature Elements:** โลโก้รูปสัญลักษณ์เปลวไฟ/ลูกศร, แถบสถานะ coral, preview phone frame
- **Interaction Philosophy:** ปุ่มหลักชัดเจนและมีข้อความตรงไปตรงมา; การแก้ไขพรีวิวผลทันที; destructive action ต้องมี confirmation
- **Animation:** ใช้ transition 180–240ms, hover ยกขึ้นเล็กน้อย, shimmer เฉพาะ loading และปุ่ม publish ไม่ใช้ motion หนัก
- **Typography System:** ใช้ `Noto Sans Thai` เป็น primary; น้ำหนัก 400/500/600/700; หัวข้อ 30–36px, section 16px, body 14px, label 12px
- **Brand Essence:** เครื่องมือสร้างเซลเพจที่เปลี่ยนทราฟฟิกจาก TikTok ให้เป็นยอดขาย — คล่องตัว, คม, ลงมือทำ
- **Brand Voice:** กระชับ มั่นใจ เป็นเพื่อนนักขาย เช่น “เปิดหน้าให้พร้อมยิงในไม่กี่นาที” และ “ทุกคลิกมีที่ไป ทุกยอดมีหลักฐาน”
- **Wordmark & Logo:** ตัวอักษร `lnw` สี navy อยู่ในกรอบโค้งพร้อมเส้นเฉียง coral ให้รู้สึกเหมือนลิงก์ที่พุ่งไปข้างหน้า
- **Signature Brand Color:** Coral `#ff6b4a` ใช้กับ CTA, สถานะ active และจุดเน้นของแบรนด์

## โครงสร้างไฟล์หลัก
- `client/src/App.tsx` — route map และ app shell
- `client/src/pages/Home.tsx` — dashboard, editor, public page, OAuth gate และ checkout flows
- `client/src/index.css` — design tokens, responsive layout และ component styling
- `public/manus-routes.json` — route manifest สำหรับ Webdev
- `drizzle/schema.ts`, `server/routers.ts`, `server/db.ts` — schema, queries และ protected/public procedures สำหรับ production backend
- `vercel.json` — proxy API จาก branded Vercel frontend ไปยัง Manus server ที่มี database
