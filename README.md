# Oro Shelf

เว็บต้นแบบสำหรับแสดงผลข้อมูลการตรวจสอบสินค้าในตู้จัดวางจาก AI โดยใช้
- **Frontend:** Next.js
- **Backend:** Django + Django REST Framework
- **Database:** PostgreSQL
- **Infrastructure:** Docker Compose

## ความสามารถหลัก
- แสดงข้อมูลสรุปการตรวจสอบล่าสุด: จำนวนสินค้า, ช่องว่าง, สินค้าคงเหลือโดยประมาณ
- ตารางผลตรวจสอบจาก AI (จำนวนสินค้า, ช่องว่าง, รายการสินค้าที่แสดง)
- เพิ่มหมวดหมู่สินค้า
- อัปโหลดสินค้าอ้างอิงพร้อมรูปภาพ/รายละเอียด เพื่อให้ AI ใช้เป็นข้อมูลประกอบ

## โครงสร้าง API
- `GET/POST /api/categories/`
- `GET/POST /api/product-references/`
- `GET/POST /api/inspections/`

ตัวอย่าง payload สำหรับสร้าง inspection:

```json
{
  "total_products": 24,
  "empty_slots": 6,
  "displayed_products": ["น้ำดื่ม", "โค้ก", "ชาเขียว"],
  "remaining_stock": 16,
  "ai_summary": "สินค้าประเภทน้ำดื่มเหลือน้อย"
}
```

## วิธีรัน
```bash
docker compose up --build
```

จากนั้นเปิดใช้งาน:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api/
- Django Admin: http://localhost:8000/admin/
