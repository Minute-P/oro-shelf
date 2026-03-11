'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';

type Inspection = {
  id: number;
  checked_at: string;
  total_products: number;
  empty_slots: number;
  displayed_products: string[];
  remaining_stock: number | null;
  ai_summary: string;
};

type Category = { id: number; name: string; description: string };
type ProductRef = { id: number; name: string; details: string; category_name: string; image: string | null };

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export default function Dashboard() {
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [refs, setRefs] = useState<ProductRef[]>([]);

  const [categoryName, setCategoryName] = useState('');
  const [categoryDesc, setCategoryDesc] = useState('');

  const [refName, setRefName] = useState('');
  const [refDetails, setRefDetails] = useState('');
  const [refCategory, setRefCategory] = useState('');
  const [refImage, setRefImage] = useState<File | null>(null);

  const summary = useMemo(() => {
    if (inspections.length === 0) return { total: 0, empty: 0, remain: 0 };
    const latest = inspections[0];
    return {
      total: latest.total_products,
      empty: latest.empty_slots,
      remain: latest.remaining_stock ?? 0
    };
  }, [inspections]);

  const loadData = async () => {
    const [inspRes, catRes, refRes] = await Promise.all([
      fetch(`${API}/inspections/`),
      fetch(`${API}/categories/`),
      fetch(`${API}/product-references/`)
    ]);
    setInspections(await inspRes.json());
    const catData: Category[] = await catRes.json();
    setCategories(catData);
    if (catData.length && !refCategory) setRefCategory(String(catData[0].id));
    setRefs(await refRes.json());
  };

  useEffect(() => {
    loadData().catch(console.error);
  }, []);

  const submitCategory = async (e: FormEvent) => {
    e.preventDefault();
    await fetch(`${API}/categories/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: categoryName, description: categoryDesc })
    });
    setCategoryName('');
    setCategoryDesc('');
    loadData().catch(console.error);
  };

  const submitReference = async (e: FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', refName);
    form.append('details', refDetails);
    form.append('category', refCategory);
    if (refImage) form.append('image', refImage);

    await fetch(`${API}/product-references/`, { method: 'POST', body: form });
    setRefName('');
    setRefDetails('');
    setRefImage(null);
    loadData().catch(console.error);
  };

  return (
    <main>
      <h1>Oro Shelf AI Dashboard</h1>
      <small>แดชบอร์ดเบื้องต้นสำหรับดูผลตรวจสอบตู้สินค้าและจัดการข้อมูลอ้างอิงให้ AI</small>

      <section>
        <h2>ภาพรวมล่าสุด</h2>
        <div className="grid">
          <div className="card"><strong>จำนวนสินค้า</strong><div>{summary.total}</div></div>
          <div className="card"><strong>ช่องว่างในตู้</strong><div>{summary.empty}</div></div>
          <div className="card"><strong>คงเหลือโดยประมาณ</strong><div>{summary.remain}</div></div>
        </div>
      </section>

      <section>
        <h2>เพิ่มหมวดหมู่สินค้า</h2>
        <form className="grid" onSubmit={submitCategory}>
          <div>
            <label>ชื่อหมวดหมู่</label>
            <input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required />
          </div>
          <div>
            <label>คำอธิบาย</label>
            <input value={categoryDesc} onChange={(e) => setCategoryDesc(e.target.value)} />
          </div>
          <div style={{ alignSelf: 'end' }}><button type="submit">บันทึกหมวดหมู่</button></div>
        </form>
      </section>

      <section>
        <h2>อัปโหลดข้อมูลสินค้าอ้างอิงให้ AI</h2>
        <form className="grid" onSubmit={submitReference}>
          <div>
            <label>ชื่อสินค้า</label>
            <input value={refName} onChange={(e) => setRefName(e.target.value)} required />
          </div>
          <div>
            <label>หมวดหมู่</label>
            <select value={refCategory} onChange={(e) => setRefCategory(e.target.value)} required>
              <option value="">เลือกหมวดหมู่</option>
              {categories.map((cat) => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
            </select>
          </div>
          <div>
            <label>รายละเอียด</label>
            <textarea value={refDetails} onChange={(e) => setRefDetails(e.target.value)} rows={2} />
          </div>
          <div>
            <label>รูปสินค้า</label>
            <input type="file" accept="image/*" onChange={(e) => setRefImage(e.target.files?.[0] || null)} />
          </div>
          <div style={{ alignSelf: 'end' }}><button type="submit">บันทึกสินค้าอ้างอิง</button></div>
        </form>
      </section>

      <section>
        <h2>ผลตรวจสอบจาก AI</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>เวลา</th><th>จำนวนสินค้า</th><th>ช่องว่าง</th><th>สินค้าที่แสดง</th><th>คงเหลือ</th>
              </tr>
            </thead>
            <tbody>
              {inspections.map((row) => (
                <tr key={row.id}>
                  <td>{new Date(row.checked_at).toLocaleString('th-TH')}</td>
                  <td>{row.total_products}</td>
                  <td>{row.empty_slots}</td>
                  <td>{row.displayed_products.join(', ')}</td>
                  <td>{row.remaining_stock ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>รายการสินค้าอ้างอิง</h2>
        <ul>
          {refs.map((r) => (
            <li key={r.id}>{r.name} ({r.category_name})</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
