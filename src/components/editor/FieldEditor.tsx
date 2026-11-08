import React, { useRef, useState } from 'react';
import { Plus, Trash2, ChevronUp, ChevronDown, Upload } from 'lucide-react';

/* ---------- helpers ---------- */
const humanize = (k: string) =>
    k.replace(/([A-Z])/g, ' $1').replace(/[_-]/g, ' ').replace(/^./, (c) => c.toUpperCase());

const IMG_KEY = /(poster|image|img|photo|avatar|thumbnail|logo|cover|^src$)/i;
const VID_KEY = /video/i;
const URL_KEY = /(link|url|href)/i;

const inputCls =
    'w-full bg-slate-900 border border-slate-700/80 rounded px-2 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500';
const labelCls = 'block text-[10px] uppercase tracking-wider text-slate-400 mb-1';

const isHex = (v?: string) => !!v && /^#[0-9a-f]{6}$/i.test(v);

const itemTitle = (item: any, i: number) => {
    if (item && typeof item === 'object') {
        const t = item.title || item.name || item.label || item.role || item.category || item.id;
        if (typeof t === 'string' && t) return `${i + 1}. ${t}`;
    }
    return `Item ${i + 1}`;
};

/* ---------- small inputs ---------- */
export const ColorInput: React.FC<{ value?: string; onChange: (v: string) => void }> = ({
    value,
    onChange,
}) => (
    <div className="flex items-center gap-2">
        <input
            type="color"
            value={isHex(value) ? value : '#000000'}
            onChange={(e) => onChange(e.target.value)}
            className="w-8 h-8 shrink-0 rounded border border-slate-700 bg-transparent cursor-pointer"
        />
        <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className={`${inputCls} font-mono`}
        />
    </div>
);

const ImageField: React.FC<{ value: string; onChange: (v: string) => void }> = ({
    value,
    onChange,
}) => {
    const ref = useRef<HTMLInputElement>(null);
    const upload = (file?: File) => {
        if (!file) return;
        const r = new FileReader();
        r.onload = () => onChange(String(r.result));
        r.readAsDataURL(file);
    };
    return (
        <div className="space-y-1.5">
            {value && (
                <img
                    src={value}
                    alt=""
                    className="h-24 w-full rounded border border-slate-700 object-cover bg-slate-950"
                    onError={(e) => ((e.target as HTMLImageElement).style.opacity = '0.2')}
                />
            )}
            <div className="flex gap-1.5">
                <input
                    type="text"
                    value={value?.startsWith('data:') ? '(uploaded image)' : value || ''}
                    readOnly={value?.startsWith('data:')}
                    placeholder="https://... ba /assets/..."
                    onChange={(e) => onChange(e.target.value)}
                    className={`${inputCls} font-mono`}
                />
                <button
                    type="button"
                    onClick={() => ref.current?.click()}
                    className="shrink-0 px-2 rounded border border-slate-700 text-slate-300 hover:bg-slate-800 cursor-pointer"
                    title="Upload"
                >
                    <Upload className="w-3.5 h-3.5" />
                </button>
                <input
                    ref={ref}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => upload(e.target.files?.[0])}
                />
            </div>
        </div>
    );
};

const VideoField: React.FC<{ value: string; onChange: (v: string) => void }> = ({
    value,
    onChange,
}) => (
    <div className="space-y-1.5">
        {/\.(mp4|webm|ogg)(\?|$)/i.test(value || '') && (
            <video
                src={value}
                muted
                controls
                className="h-28 w-full rounded border border-slate-700 bg-black object-cover"
            />
        )}
        <input
            type="text"
            value={value || ''}
            placeholder="https://...mp4 / YouTube / Vimeo"
            onChange={(e) => onChange(e.target.value)}
            className={`${inputCls} font-mono text-amber-300`}
        />
    </div>
);

/* ---------- style editor ---------- */
export const StyleEditor: React.FC<{
    styles?: Record<string, any>;
    onChange: (s: Record<string, any>) => void;
}> = ({ styles = {}, onChange }) => {
    const set = (k: string, v: string) => onChange({ ...styles, [k]: v });
    const px = (v?: string) => (v ? parseInt(v) || '' : '');
    return (
        <div className="grid grid-cols-2 gap-2 p-2 rounded bg-slate-950/60 border border-slate-800">
            <div>
                <label className={labelCls}>Font size (px)</label>
                <input
                    type="number"
                    className={inputCls}
                    value={px(styles.fontSize)}
                    onChange={(e) => set('fontSize', e.target.value ? `${e.target.value}px` : '')}
                />
            </div>
            <div>
                <label className={labelCls}>Weight</label>
                <select
                    className={inputCls}
                    value={styles.fontWeight || ''}
                    onChange={(e) => set('fontWeight', e.target.value)}
                >
                    <option value="">auto</option>
                    {['300', '400', '500', '600', '700', '800'].map((w) => (
                        <option key={w}>{w}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className={labelCls}>Align</label>
                <select
                    className={inputCls}
                    value={styles.textAlign || ''}
                    onChange={(e) => set('textAlign', e.target.value)}
                >
                    <option value="">auto</option>
                    <option>left</option>
                    <option>center</option>
                    <option>right</option>
                </select>
            </div>
            <div>
                <label className={labelCls}>Radius (px)</label>
                <input
                    type="number"
                    className={inputCls}
                    value={px(styles.borderRadius)}
                    onChange={(e) => set('borderRadius', e.target.value ? `${e.target.value}px` : '')}
                />
            </div>
            <div className="col-span-2">
                <label className={labelCls}>Text color</label>
                <ColorInput value={styles.color} onChange={(v) => set('color', v)} />
            </div>
            <div className="col-span-2">
                <label className={labelCls}>Background</label>
                <ColorInput value={styles.backgroundColor} onChange={(v) => set('backgroundColor', v)} />
            </div>
        </div>
    );
};

/* ---------- generic field ---------- */
interface FieldProps {
    k: string;
    value: any;
    onChange: (v: any) => void;
}

const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/40 space-y-2">
        <span className="font-semibold text-slate-200 block text-xs">{title}</span>
        {children}
    </div>
);

export const ObjectFields: React.FC<{
    obj: Record<string, any>;
    onChange: (o: Record<string, any>) => void;
    skip?: string[];
}> = ({ obj, onChange, skip = [] }) => (
    <div className="space-y-3">
        {Object.keys(obj)
            .filter((k) => k !== 'id' && k !== 'styles' && !skip.includes(k) && typeof obj[k] !== 'function')
            .map((k) => (
                <Field key={k} k={k} value={obj[k]} onChange={(v) => onChange({ ...obj, [k]: v })} />
            ))}
    </div>
);

const StyleToggle: React.FC<{
    styles?: Record<string, any>;
    onChange: (s: Record<string, any>) => void;
}> = ({ styles, onChange }) => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="text-[10px] text-indigo-400 hover:underline cursor-pointer"
            >
                {open ? 'Hide style' : 'Style this'}
            </button>
            {open && (
                <div className="mt-1.5">
                    <StyleEditor styles={styles} onChange={onChange} />
                </div>
            )}
        </div>
    );
};

const Repeater: React.FC<FieldProps> = ({ k, value, onChange }) => {
    const list: any[] = value;
    const move = (i: number, d: -1 | 1) => {
        const j = i + d;
        if (j < 0 || j >= list.length) return;
        const u = [...list];
        [u[i], u[j]] = [u[j], u[i]];
        onChange(u);
    };
    const add = () => {
        if (!list.length) return;
        const clone = JSON.parse(JSON.stringify(list[list.length - 1]));
        if ('id' in clone) clone.id = `${k}_${Date.now()}`;
        onChange([...list, clone]);
    };
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-200 text-xs">
                    {humanize(k)} ({list.length})
                </span>
                <button
                    type="button"
                    onClick={add}
                    disabled={!list.length}
                    title={list.length ? 'Duplicate last item' : 'Empty list'}
                    className="inline-flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 disabled:opacity-30 cursor-pointer"
                >
                    <Plus className="w-3 h-3" /> Add
                </button>
            </div>

            {list.map((item, i) => (
                <details
                    key={item?.id ?? i}
                    open={list.length <= 2}
                    className="rounded bg-slate-950/60 border border-slate-800"
                >
                    <summary className="flex items-center justify-between gap-2 px-2.5 py-2 cursor-pointer text-[11px] text-slate-300 select-none">
                        <span className="truncate">{itemTitle(item, i)}</span>
                        <span className="flex items-center gap-1 shrink-0" onClick={(e) => e.preventDefault()}>
                            <button type="button" onClick={() => move(i, -1)} className="p-0.5 hover:text-white cursor-pointer">
                                <ChevronUp className="w-3 h-3" />
                            </button>
                            <button type="button" onClick={() => move(i, 1)} className="p-0.5 hover:text-white cursor-pointer">
                                <ChevronDown className="w-3 h-3" />
                            </button>
                            <button
                                type="button"
                                onClick={() => onChange(list.filter((_, x) => x !== i))}
                                className="p-0.5 hover:text-rose-400 cursor-pointer"
                            >
                                <Trash2 className="w-3 h-3" />
                            </button>
                        </span>
                    </summary>
                    <div className="p-2.5 pt-1">
                        {item && typeof item === 'object' ? (
                            <ObjectFields
                                obj={item}
                                onChange={(o) => {
                                    const u = [...list];
                                    u[i] = o;
                                    onChange(u);
                                }}
                            />
                        ) : (
                            <input
                                className={inputCls}
                                value={String(item ?? '')}
                                onChange={(e) => {
                                    const u = [...list];
                                    u[i] = e.target.value;
                                    onChange(u);
                                }}
                            />
                        )}
                    </div>
                </details>
            ))}
        </div>
    );
};

export const Field: React.FC<FieldProps> = ({ k, value, onChange }) => {
    const label = humanize(k);

    // ---- arrays
    if (Array.isArray(value)) {
        if (value.every((v) => typeof v === 'string')) {
            return (
                <div>
                    <label className={labelCls}>{label} (1 per line)</label>
                    <textarea
                        rows={Math.min(8, Math.max(3, value.length))}
                        className={`${inputCls} font-mono`}
                        value={value.join('\n')}
                        onChange={(e) => onChange(e.target.value.split('\n'))}
                    />
                </div>
            );
        }
        return <Repeater k={k} value={value} onChange={onChange} />;
    }

    // ---- objects
    if (value && typeof value === 'object') {
        // text block {text, styles}
        if (typeof value.text === 'string') {
            return (
                <Card title={label}>
                    <textarea
                        rows={value.text.length > 90 ? 4 : 2}
                        className={inputCls}
                        value={value.text}
                        onChange={(e) => onChange({ ...value, text: e.target.value })}
                    />
                    <StyleToggle styles={value.styles} onChange={(s) => onChange({ ...value, styles: s })} />
                </Card>
            );
        }
        // button {label, link}
        if ('label' in value && 'link' in value) {
            return (
                <Card title={label}>
                    <div>
                        <label className={labelCls}>Label</label>
                        <input className={inputCls} value={value.label || ''} onChange={(e) => onChange({ ...value, label: e.target.value })} />
                    </div>
                    <div>
                        <label className={labelCls}>Link</label>
                        <input className={`${inputCls} font-mono`} value={value.link || ''} onChange={(e) => onChange({ ...value, link: e.target.value })} />
                    </div>
                    <StyleToggle styles={value.styles} onChange={(s) => onChange({ ...value, styles: s })} />
                </Card>
            );
        }
        // image {src, alt}
        if ('src' in value) {
            return (
                <Card title={label}>
                    <ImageField value={value.src || ''} onChange={(v) => onChange({ ...value, src: v })} />
                    {'alt' in value && (
                        <div>
                            <label className={labelCls}>Alt text</label>
                            <input className={inputCls} value={value.alt || ''} onChange={(e) => onChange({ ...value, alt: e.target.value })} />
                        </div>
                    )}
                    {value.styles && (
                        <StyleToggle styles={value.styles} onChange={(s) => onChange({ ...value, styles: s })} />
                    )}
                </Card>
            );
        }
        // generic group
        return (
            <Card title={label}>
                <ObjectFields obj={value} onChange={onChange} />
            </Card>
        );
    }

    // ---- primitives
    if (typeof value === 'boolean') {
        return (
            <label className="flex items-center justify-between text-xs text-slate-300">
                {label}
                <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} className="accent-indigo-500" />
            </label>
        );
    }
    if (typeof value === 'number') {
        return (
            <div>
                <label className={labelCls}>{label}</label>
                <input type="number" className={inputCls} value={value} onChange={(e) => onChange(Number(e.target.value) || 0)} />
            </div>
        );
    }

    const str = String(value ?? '');
    let control: React.ReactNode;
    if (IMG_KEY.test(k)) control = <ImageField value={str} onChange={onChange} />;
    else if (VID_KEY.test(k)) control = <VideoField value={str} onChange={onChange} />;
    else if (/color/i.test(k)) control = <ColorInput value={str} onChange={onChange} />;
    else if (URL_KEY.test(k))
        control = <input className={`${inputCls} font-mono`} value={str} onChange={(e) => onChange(e.target.value)} />;
    else if (str.length > 60 || str.includes('\n'))
        control = <textarea rows={4} className={inputCls} value={str} onChange={(e) => onChange(e.target.value)} />;
    else control = <input className={inputCls} value={str} onChange={(e) => onChange(e.target.value)} />;

    return (
        <div>
            <label className={labelCls}>{label}</label>
            {control}
        </div>
    );
};