(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/labex-front/components/ui/index.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Avatar",
    ()=>Avatar,
    "Badge",
    ()=>Badge,
    "Button",
    ()=>Button,
    "Card",
    ()=>Card,
    "EmptyState",
    ()=>EmptyState,
    "Input",
    ()=>Input,
    "Select",
    ()=>Select,
    "Skeleton",
    ()=>Skeleton,
    "Textarea",
    ()=>Textarea
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
;
const badgeStyles = {
    brand: "bg-brand-50 text-brand-700 ring-brand-200 dark:bg-brand-950 dark:text-brand-300 dark:ring-brand-800",
    success: "bg-success-50 text-success-700 ring-green-200 dark:bg-green-950 dark:text-green-300 dark:ring-green-800",
    warning: "bg-warning-50 text-warning-700 ring-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:ring-yellow-800",
    neutral: "bg-neutral-100 text-neutral-600 ring-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:ring-neutral-700",
    danger: "bg-danger-50 text-danger-700 ring-red-200 dark:bg-red-950 dark:text-red-300 dark:ring-red-800"
};
function Badge({ children, variant = "neutral", className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold ring-1", badgeStyles[variant], className),
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/labex-front/components/ui/index.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = Badge;
const btnVariants = {
    primary: "bg-brand-600 text-white shadow-brand/20 shadow-md hover:bg-brand-700 active:bg-brand-800",
    secondary: "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 ring-1 ring-neutral-300 dark:ring-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700 active:bg-neutral-100",
    ghost: "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 active:bg-neutral-200",
    danger: "bg-danger-500 text-white hover:bg-danger-700",
    success: "bg-success-600 text-white hover:bg-success-700 active:bg-success-800"
};
const btnSizes = {
    sm: "h-8 px-3 text-sm gap-1.5",
    md: "h-9 px-4 text-sm gap-2",
    lg: "h-11 px-6 text-base gap-2"
};
const Button = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c1 = ({ variant = "primary", size = "md", loading, className, children, disabled, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        ref: ref,
        disabled: disabled || loading,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed", btnVariants[variant], btnSizes[size], className),
        ...props,
        children: [
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "animate-spin -ml-0.5 w-4 h-4",
                fill: "none",
                viewBox: "0 0 24 24",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        className: "opacity-25",
                        cx: "12",
                        cy: "12",
                        r: "10",
                        stroke: "currentColor",
                        strokeWidth: "4"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/labex-front/components/ui/index.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        className: "opacity-75",
                        fill: "currentColor",
                        d: "M4 12a8 8 0 018-8v8H4z"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/labex-front/components/ui/index.tsx",
                        lineNumber: 68,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/labex-front/components/ui/index.tsx",
                lineNumber: 66,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/labex-front/components/ui/index.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
_c2 = Button;
Button.displayName = "Button";
const Input = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c3 = ({ label, error, hint, leftIcon, className, id, ...props }, ref)=>{
    const inputId = id ?? label?.toLowerCase().replace(/\s/g, "-");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-1.5",
        children: [
            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: inputId,
                className: "text-sm font-medium text-neutral-700 dark:text-neutral-300",
                children: label
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/components/ui/index.tsx",
                lineNumber: 91,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    leftIcon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500",
                        children: leftIcon
                    }, void 0, false, {
                        fileName: "[project]/Downloads/labex-front/components/ui/index.tsx",
                        lineNumber: 97,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: ref,
                        id: inputId,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full h-10 rounded-xl border bg-white dark:bg-neutral-800 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500", "px-3 transition-all outline-none", "border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500", "focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20", error && "border-danger-500 focus:border-danger-500 focus:ring-danger-500/20", leftIcon && "pl-9", className),
                        ...props
                    }, void 0, false, {
                        fileName: "[project]/Downloads/labex-front/components/ui/index.tsx",
                        lineNumber: 101,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/labex-front/components/ui/index.tsx",
                lineNumber: 95,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-danger-500",
                children: error
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/components/ui/index.tsx",
                lineNumber: 116,
                columnNumber: 19
            }, ("TURBOPACK compile-time value", void 0)),
            hint && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-neutral-400 dark:text-neutral-500",
                children: hint
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/components/ui/index.tsx",
                lineNumber: 117,
                columnNumber: 28
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/labex-front/components/ui/index.tsx",
        lineNumber: 89,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c4 = Input;
Input.displayName = "Input";
const Textarea = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c5 = ({ label, error, className, id, ...props }, ref)=>{
    const inputId = id ?? label?.toLowerCase().replace(/\s/g, "-");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-1.5",
        children: [
            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: inputId,
                className: "text-sm font-medium text-neutral-700 dark:text-neutral-300",
                children: label
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/components/ui/index.tsx",
                lineNumber: 135,
                columnNumber: 19
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                ref: ref,
                id: inputId,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full rounded-xl border bg-white dark:bg-neutral-800 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500", "p-3 transition-all outline-none resize-none", "border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500", "focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20", error && "border-danger-500 focus:border-danger-500 focus:ring-danger-500/20", className),
                ...props
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/components/ui/index.tsx",
                lineNumber: 136,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-danger-500",
                children: error
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/components/ui/index.tsx",
                lineNumber: 149,
                columnNumber: 19
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/labex-front/components/ui/index.tsx",
        lineNumber: 134,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c6 = Textarea;
Textarea.displayName = "Textarea";
const Select = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c7 = ({ label, error, options, className, id, ...props }, ref)=>{
    const inputId = id ?? label?.toLowerCase().replace(/\s/g, "-");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-1.5",
        children: [
            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: inputId,
                className: "text-sm font-medium text-neutral-700",
                children: label
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/components/ui/index.tsx",
                lineNumber: 168,
                columnNumber: 19
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                ref: ref,
                id: inputId,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full h-10 rounded-xl border bg-white dark:bg-neutral-800 text-sm text-neutral-900 dark:text-neutral-100", "px-3 transition-all outline-none appearance-none", "border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500", "focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20", error && "border-danger-500", className),
                ...props,
                children: options.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: o.value,
                        children: o.label
                    }, o.value, false, {
                        fileName: "[project]/Downloads/labex-front/components/ui/index.tsx",
                        lineNumber: 182,
                        columnNumber: 31
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/components/ui/index.tsx",
                lineNumber: 169,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-danger-500",
                children: error
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/components/ui/index.tsx",
                lineNumber: 184,
                columnNumber: 19
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/labex-front/components/ui/index.tsx",
        lineNumber: 167,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c8 = Select;
Select.displayName = "Select";
function Card({ children, className, hover = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-card", hover && "hover:shadow-card-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer", className),
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/labex-front/components/ui/index.tsx",
        lineNumber: 198,
        columnNumber: 5
    }, this);
}
_c9 = Card;
function Skeleton({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-800", className)
    }, void 0, false, {
        fileName: "[project]/Downloads/labex-front/components/ui/index.tsx",
        lineNumber: 210,
        columnNumber: 10
    }, this);
}
_c10 = Skeleton;
function Avatar({ name, size = "md", src }) {
    const initials = name.split(" ").slice(0, 2).map((n)=>n[0]).join("").toUpperCase();
    const sizes = {
        sm: "w-6 h-6 text-[10px]",
        md: "w-8 h-8 text-xs",
        lg: "w-10 h-10 text-sm"
    };
    if (src) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
        src: src,
        alt: name,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-full object-cover", sizes[size])
    }, void 0, false, {
        fileName: "[project]/Downloads/labex-front/components/ui/index.tsx",
        lineNumber: 217,
        columnNumber: 19
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-full bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 font-bold flex items-center justify-center flex-shrink-0", sizes[size]),
        children: initials
    }, void 0, false, {
        fileName: "[project]/Downloads/labex-front/components/ui/index.tsx",
        lineNumber: 219,
        columnNumber: 5
    }, this);
}
_c11 = Avatar;
function EmptyState({ icon, title, description, action }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-center py-20 text-center gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400",
                children: icon
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/components/ui/index.tsx",
                lineNumber: 234,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-semibold text-neutral-700 dark:text-neutral-200",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/Downloads/labex-front/components/ui/index.tsx",
                        lineNumber: 238,
                        columnNumber: 9
                    }, this),
                    description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-neutral-400 dark:text-neutral-500 mt-1 max-w-sm",
                        children: description
                    }, void 0, false, {
                        fileName: "[project]/Downloads/labex-front/components/ui/index.tsx",
                        lineNumber: 239,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/labex-front/components/ui/index.tsx",
                lineNumber: 237,
                columnNumber: 7
            }, this),
            action
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/labex-front/components/ui/index.tsx",
        lineNumber: 233,
        columnNumber: 5
    }, this);
}
_c12 = EmptyState;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12;
__turbopack_context__.k.register(_c, "Badge");
__turbopack_context__.k.register(_c1, "Button$forwardRef");
__turbopack_context__.k.register(_c2, "Button");
__turbopack_context__.k.register(_c3, "Input$forwardRef");
__turbopack_context__.k.register(_c4, "Input");
__turbopack_context__.k.register(_c5, "Textarea$forwardRef");
__turbopack_context__.k.register(_c6, "Textarea");
__turbopack_context__.k.register(_c7, "Select$forwardRef");
__turbopack_context__.k.register(_c8, "Select");
__turbopack_context__.k.register(_c9, "Card");
__turbopack_context__.k.register(_c10, "Skeleton");
__turbopack_context__.k.register(_c11, "Avatar");
__turbopack_context__.k.register(_c12, "EmptyState");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EditarPublicacaoPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/lucide-react/dist/esm/icons/user-plus.js [app-client] (ecmascript) <export default as UserPlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$components$2f$ui$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/components/ui/index.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$hooks$2f$useQueries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/lib/hooks/useQueries.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$contexts$2f$auth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/contexts/auth.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
/* ── Helpers de formulário (mesmos da page de criação) ────────────── */ function FieldGroup({ label, required, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-1.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "text-sm font-medium text-neutral-700 dark:text-neutral-300",
                children: [
                    label,
                    required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-danger-500 ml-0.5",
                        children: "*"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                        lineNumber: 18,
                        columnNumber: 29
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_c = FieldGroup;
const inp = "w-full h-10 rounded-xl border border-neutral-300 dark:border-neutral-600 px-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all bg-white dark:bg-neutral-800 dark:text-neutral-100";
const ta = "w-full rounded-xl border border-neutral-300 dark:border-neutral-600 p-3 text-sm resize-none outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all bg-white dark:bg-neutral-800 dark:text-neutral-100";
const sel = "h-10 w-full rounded-xl border border-neutral-300 dark:border-neutral-600 px-3 text-sm bg-white dark:bg-neutral-800 dark:text-neutral-100 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all";
/* ── Formulários por tipo ─────────────────────────────────────────── */ function FormArticle({ form, set, projects }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid md:grid-cols-2 gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Título",
                required: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: inp,
                    value: form.title,
                    onChange: (e)=>set({
                            ...form,
                            title: e.target.value
                        }),
                    placeholder: "Título do artigo"
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 34,
                    columnNumber: 43
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Ano",
                required: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "number",
                    min: "1900",
                    max: "2100",
                    className: inp,
                    value: form.year,
                    onChange: (e)=>set({
                            ...form,
                            year: e.target.value
                        })
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 35,
                    columnNumber: 40
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Resumo / Abstract",
                required: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                    rows: 3,
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(ta, "md:col-span-2"),
                    value: form.abstract,
                    onChange: (e)=>set({
                            ...form,
                            abstract: e.target.value
                        }),
                    placeholder: "Descreva o conteúdo e contribuições..."
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 36,
                    columnNumber: 54
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Autores (nomes separados por vírgula)",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: inp,
                    value: form.authors,
                    onChange: (e)=>set({
                            ...form,
                            authors: e.target.value
                        }),
                    placeholder: "Ex: João Silva, Maria Santos"
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 37,
                    columnNumber: 65
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Projeto vinculado",
                required: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                    className: sel,
                    value: form.projectId,
                    onChange: (e)=>set({
                            ...form,
                            projectId: e.target.value
                        }),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: "",
                            children: "Selecione um projeto"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                            lineNumber: 40,
                            columnNumber: 11
                        }, this),
                        projects.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: p.id,
                                children: p.title
                            }, p.id, false, {
                                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                lineNumber: 41,
                                columnNumber: 37
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Revista / Evento",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: inp,
                    value: form.journal,
                    onChange: (e)=>set({
                            ...form,
                            journal: e.target.value
                        }),
                    placeholder: "Ex: IEEE Transactions, SBRC 2024"
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 44,
                    columnNumber: 44
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "DOI",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: inp,
                    value: form.doi,
                    onChange: (e)=>set({
                            ...form,
                            doi: e.target.value
                        }),
                    placeholder: "10.xxxx/xxxxx"
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 45,
                    columnNumber: 31
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Link Zenodo",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: inp,
                    value: form.zenodoLink,
                    onChange: (e)=>set({
                            ...form,
                            zenodoLink: e.target.value
                        }),
                    placeholder: "https://zenodo.org/..."
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 46,
                    columnNumber: 39
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Palavras-chave (separadas por vírgula)",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: inp,
                    value: form.tags,
                    onChange: (e)=>set({
                            ...form,
                            tags: e.target.value
                        }),
                    placeholder: "Ex: iot, machine learning"
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 47,
                    columnNumber: 66
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_c1 = FormArticle;
function FormReport({ form, set, projects }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid md:grid-cols-2 gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Título",
                required: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: inp,
                    value: form.title,
                    onChange: (e)=>set({
                            ...form,
                            title: e.target.value
                        }),
                    placeholder: "Título do relatório"
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 55,
                    columnNumber: 43
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Ano",
                required: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "number",
                    min: "1900",
                    max: "2100",
                    className: inp,
                    value: form.year,
                    onChange: (e)=>set({
                            ...form,
                            year: e.target.value
                        })
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 56,
                    columnNumber: 40
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Resumo",
                required: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                    rows: 3,
                    className: ta,
                    value: form.abstract,
                    onChange: (e)=>set({
                            ...form,
                            abstract: e.target.value
                        }),
                    placeholder: "Descreva o conteúdo..."
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 57,
                    columnNumber: 43
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                        label: "Autores *",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            className: inp,
                            value: form.authors,
                            onChange: (e)=>set({
                                    ...form,
                                    authors: e.target.value
                                }),
                            placeholder: "Nomes separados por vírgula"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                            lineNumber: 59,
                            columnNumber: 39
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                        label: "Projeto vinculado",
                        required: true,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            className: sel,
                            value: form.projectId,
                            onChange: (e)=>set({
                                    ...form,
                                    projectId: e.target.value
                                }),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "",
                                    children: "Selecione um projeto"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                    lineNumber: 62,
                                    columnNumber: 13
                                }, this),
                                projects.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: p.id,
                                        children: p.title
                                    }, p.id, false, {
                                        fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                        lineNumber: 63,
                                        columnNumber: 39
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Orientador (se houver)",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: inp,
                    value: form.advisor,
                    onChange: (e)=>set({
                            ...form,
                            advisor: e.target.value
                        }),
                    placeholder: "Nome do orientador"
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 67,
                    columnNumber: 50
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Tipo de relatório",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                    className: sel,
                    value: form.reportType,
                    onChange: (e)=>set({
                            ...form,
                            reportType: e.target.value
                        }),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: "",
                            children: "Selecione"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: "Técnico",
                            children: "Técnico"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                            lineNumber: 71,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: "Parcial",
                            children: "Parcial"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: "Final",
                            children: "Final"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 69,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Versão (ex: v1.0, v2.0)",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: inp,
                    value: form.version,
                    onChange: (e)=>set({
                            ...form,
                            version: e.target.value
                        }),
                    placeholder: "v1.0"
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 76,
                    columnNumber: 51
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Número do relatório",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: inp,
                    value: form.reportNumber,
                    onChange: (e)=>set({
                            ...form,
                            reportNumber: e.target.value
                        }),
                    placeholder: "Ex: REL-2025-001"
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 77,
                    columnNumber: 47
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Instituição",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: inp,
                    value: form.institution,
                    onChange: (e)=>set({
                            ...form,
                            institution: e.target.value
                        }),
                    placeholder: "Nome da instituição"
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 78,
                    columnNumber: 39
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Link do PDF / Arquivo",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: inp,
                    value: form.zenodoLink,
                    onChange: (e)=>set({
                            ...form,
                            zenodoLink: e.target.value
                        }),
                    placeholder: "https://..."
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 79,
                    columnNumber: 49
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "DOI (se publicado)",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: inp,
                    value: form.doi,
                    onChange: (e)=>set({
                            ...form,
                            doi: e.target.value
                        }),
                    placeholder: "10.xxxx/xxxxx"
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 80,
                    columnNumber: 46
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Palavras-chave",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: inp,
                    value: form.tags,
                    onChange: (e)=>set({
                            ...form,
                            tags: e.target.value
                        }),
                    placeholder: "Separadas por vírgula"
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 81,
                    columnNumber: 42
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_c2 = FormReport;
function FormPresentation({ form, set, projects }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid md:grid-cols-2 gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Título",
                required: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: inp,
                    value: form.title,
                    onChange: (e)=>set({
                            ...form,
                            title: e.target.value
                        }),
                    placeholder: "Título da apresentação"
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 89,
                    columnNumber: 43
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Data",
                required: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "date",
                    className: inp,
                    value: form.eventDate,
                    onChange: (e)=>set({
                            ...form,
                            eventDate: e.target.value
                        })
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 90,
                    columnNumber: 41
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Resumo",
                required: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                    rows: 3,
                    className: ta,
                    value: form.abstract,
                    onChange: (e)=>set({
                            ...form,
                            abstract: e.target.value
                        }),
                    placeholder: "Descreva o conteúdo..."
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 91,
                    columnNumber: 43
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                        label: "Apresentadores *",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            className: inp,
                            value: form.authors,
                            onChange: (e)=>set({
                                    ...form,
                                    authors: e.target.value
                                }),
                            placeholder: "Nomes separados por vírgula"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                            lineNumber: 93,
                            columnNumber: 46
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                        label: "Evento *",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            className: inp,
                            value: form.journal,
                            onChange: (e)=>set({
                                    ...form,
                                    journal: e.target.value
                                }),
                            placeholder: "Ex: SBRC 2025, TechConf..."
                        }, void 0, false, {
                            fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                            lineNumber: 94,
                            columnNumber: 38
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Projeto vinculado",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                    className: sel,
                    value: form.projectId,
                    onChange: (e)=>set({
                            ...form,
                            projectId: e.target.value
                        }),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: "",
                            children: "Selecione um projeto"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                            lineNumber: 98,
                            columnNumber: 11
                        }, this),
                        projects.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: p.id,
                                children: p.title
                            }, p.id, false, {
                                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                lineNumber: 99,
                                columnNumber: 37
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 97,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Tipo de apresentação",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                    className: sel,
                    value: form.presentationType,
                    onChange: (e)=>set({
                            ...form,
                            presentationType: e.target.value
                        }),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: "",
                            children: "Selecione"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: "Oral",
                            children: "Oral"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                            lineNumber: 105,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: "Pôster",
                            children: "Pôster"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                            lineNumber: 106,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: "Demo",
                            children: "Demo"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                            lineNumber: 107,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 103,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Local",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: inp,
                    value: form.location,
                    onChange: (e)=>set({
                            ...form,
                            location: e.target.value
                        }),
                    placeholder: "Cidade, Estado ou Online"
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 110,
                    columnNumber: 33
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Carga horária (horas)",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "number",
                    min: "0",
                    className: inp,
                    value: form.workload,
                    onChange: (e)=>set({
                            ...form,
                            workload: e.target.value
                        }),
                    placeholder: "Ex: 4"
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 111,
                    columnNumber: 49
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Link do arquivo (PDF/PPT)",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: inp,
                    value: form.zenodoLink,
                    onChange: (e)=>set({
                            ...form,
                            zenodoLink: e.target.value
                        }),
                    placeholder: "https://..."
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 112,
                    columnNumber: 53
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Link do certificado",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: inp,
                    value: form.certificate,
                    onChange: (e)=>set({
                            ...form,
                            certificate: e.target.value
                        }),
                    placeholder: "https://..."
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 113,
                    columnNumber: 47
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Tags",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: inp,
                    value: form.tags,
                    onChange: (e)=>set({
                            ...form,
                            tags: e.target.value
                        }),
                    placeholder: "Separadas por vírgula"
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 114,
                    columnNumber: 32
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
        lineNumber: 88,
        columnNumber: 5
    }, this);
}
_c3 = FormPresentation;
function FormThesis({ form, set, projects }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid md:grid-cols-2 gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Título",
                required: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: inp,
                    value: form.title,
                    onChange: (e)=>set({
                            ...form,
                            title: e.target.value
                        }),
                    placeholder: "Título do TCC/monografia"
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 122,
                    columnNumber: 43
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Ano",
                required: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "number",
                    min: "1900",
                    max: "2100",
                    className: inp,
                    value: form.year,
                    onChange: (e)=>set({
                            ...form,
                            year: e.target.value
                        })
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 123,
                    columnNumber: 40
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Resumo",
                required: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                    rows: 3,
                    className: ta,
                    value: form.abstract,
                    onChange: (e)=>set({
                            ...form,
                            abstract: e.target.value
                        }),
                    placeholder: "Descreva o conteúdo e contribuições..."
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 124,
                    columnNumber: 43
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                        label: "Autor *",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            className: inp,
                            value: form.authors,
                            onChange: (e)=>set({
                                    ...form,
                                    authors: e.target.value
                                }),
                            placeholder: "Nome do autor"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                            lineNumber: 126,
                            columnNumber: 37
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                        lineNumber: 126,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                        label: "Orientador *",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            className: inp,
                            value: form.advisor,
                            onChange: (e)=>set({
                                    ...form,
                                    advisor: e.target.value
                                }),
                            placeholder: "Nome do orientador"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                            lineNumber: 127,
                            columnNumber: 42
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Curso *",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: inp,
                    value: form.course,
                    onChange: (e)=>set({
                            ...form,
                            course: e.target.value
                        }),
                    placeholder: "Ex: Engenharia de Computação"
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 129,
                    columnNumber: 35
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 129,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Instituição *",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: inp,
                    value: form.institution,
                    onChange: (e)=>set({
                            ...form,
                            institution: e.target.value
                        }),
                    placeholder: "Nome da universidade/faculdade"
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 130,
                    columnNumber: 41
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Área de pesquisa *",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: inp,
                    value: form.researchArea,
                    onChange: (e)=>set({
                            ...form,
                            researchArea: e.target.value
                        }),
                    placeholder: "Ex: Inteligência Artificial"
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 131,
                    columnNumber: 46
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Projeto vinculado",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                    className: sel,
                    value: form.projectId,
                    onChange: (e)=>set({
                            ...form,
                            projectId: e.target.value
                        }),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: "",
                            children: "Selecione um projeto"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                            lineNumber: 134,
                            columnNumber: 11
                        }, this),
                        projects.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: p.id,
                                children: p.title
                            }, p.id, false, {
                                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                lineNumber: 135,
                                columnNumber: 37
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 133,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Coorientador",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: inp,
                    value: form.coAdvisor,
                    onChange: (e)=>set({
                            ...form,
                            coAdvisor: e.target.value
                        }),
                    placeholder: "Nome do coorientador (se houver)"
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 138,
                    columnNumber: 40
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Número de páginas",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "number",
                    min: "1",
                    className: inp,
                    value: form.pages,
                    onChange: (e)=>set({
                            ...form,
                            pages: e.target.value
                        }),
                    placeholder: "Ex: 98"
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 139,
                    columnNumber: 45
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Banca examinadora",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: inp,
                    value: form.committee,
                    onChange: (e)=>set({
                            ...form,
                            committee: e.target.value
                        }),
                    placeholder: "Membros separados por vírgula"
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 140,
                    columnNumber: 45
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Nota final",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: inp,
                    value: form.grade,
                    onChange: (e)=>set({
                            ...form,
                            grade: e.target.value
                        }),
                    placeholder: "Ex: 9.5 ou Aprovado"
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 141,
                    columnNumber: 38
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 141,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Link do PDF (arquivo final)",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: inp,
                    value: form.zenodoLink,
                    onChange: (e)=>set({
                            ...form,
                            zenodoLink: e.target.value
                        }),
                    placeholder: "https://..."
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 142,
                    columnNumber: 55
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 142,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "DOI (se publicado)",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: inp,
                    value: form.doi,
                    onChange: (e)=>set({
                            ...form,
                            doi: e.target.value
                        }),
                    placeholder: "10.xxxx/xxxxx"
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 143,
                    columnNumber: 46
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 143,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Repositório GitHub",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: inp,
                    value: form.github,
                    onChange: (e)=>set({
                            ...form,
                            github: e.target.value
                        }),
                    placeholder: "https://github.com/..."
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 144,
                    columnNumber: 46
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                label: "Palavras-chave",
                required: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: inp,
                    value: form.tags,
                    onChange: (e)=>set({
                            ...form,
                            tags: e.target.value
                        }),
                    placeholder: "Separadas por vírgula"
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 145,
                    columnNumber: 51
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 145,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
        lineNumber: 121,
        columnNumber: 5
    }, this);
}
_c4 = FormThesis;
/* ── Parseia metadados extras do abstract ────────────────────────── */ function parseAbstract(raw) {
    const extras = {};
    const sepIdx = raw.indexOf("\n\n---\n");
    if (sepIdx === -1) return {
        abstract: raw,
        extras
    };
    const abstract = raw.slice(0, sepIdx).trim();
    const tail = raw.slice(sepIdx + 5);
    tail.split(" | ").forEach((kv)=>{
        const colon = kv.indexOf(": ");
        if (colon > 0) extras[kv.slice(0, colon).trim()] = kv.slice(colon + 2).trim();
    });
    return {
        abstract,
        extras
    };
}
/* ── Constantes ──────────────────────────────────────────────────── */ const EMPTY_FORM = {
    title: "",
    abstract: "",
    year: new Date().getFullYear().toString(),
    projectId: "",
    authors: "",
    journal: "",
    doi: "",
    zenodoLink: "",
    tags: "",
    content: "",
    images: "",
    references: "",
    advisor: "",
    reportType: "",
    version: "",
    reportNumber: "",
    institution: "",
    eventDate: "",
    presentationType: "",
    location: "",
    workload: "",
    certificate: "",
    course: "",
    researchArea: "",
    coAdvisor: "",
    pages: "",
    committee: "",
    grade: "",
    github: ""
};
const TYPE_LABELS_FORM = {
    ARTICLE: "Artigo Científico",
    REPORT: "Relatório Técnico",
    PRESENTATION: "Apresentação",
    THESIS: "TCC / Monografia"
};
function EditarPublicacaoPage() {
    _s();
    const { id } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user, isAuthenticated, isLoading: authLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$contexts$2f$auth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { data: publication, isLoading: pubLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$hooks$2f$useQueries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublication"])(id);
    const { data: myProjectsRaw = [] } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$hooks$2f$useQueries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboardProjects"])(isAuthenticated);
    const updateMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$hooks$2f$useQueries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdatePublication"])();
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        ...EMPTY_FORM
    });
    const [pubType, setPubType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("ARTICLE");
    const [formError, setFormError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedAuthors, setSelectedAuthors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loaded, setLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const myProjects = Array.isArray(myProjectsRaw) ? myProjectsRaw : [];
    // Busca membros do projeto selecionado para o author picker
    const { data: selectedProject } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$hooks$2f$useQueries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProject"])(form.projectId || "");
    // Redirect se não autenticado
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditarPublicacaoPage.useEffect": ()=>{
            if (!authLoading && !isAuthenticated) router.push("/auth/login");
        }
    }["EditarPublicacaoPage.useEffect"], [
        authLoading,
        isAuthenticated,
        router
    ]);
    // Preenche formulário com os dados da publicação
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditarPublicacaoPage.useEffect": ()=>{
            if (!publication || loaded) return;
            const raw = publication;
            const { abstract, extras } = parseAbstract(raw.abstract || "");
            const typeUpper = (raw.type || "article").toUpperCase();
            setPubType(typeUpper);
            setSelectedAuthors(raw.authors || []);
            const newForm = {
                ...EMPTY_FORM
            };
            newForm.title = raw.title || "";
            newForm.abstract = abstract;
            newForm.year = String(raw.year || new Date().getFullYear());
            newForm.projectId = raw.project?.id || raw.projectId || "";
            newForm.journal = raw.journal || "";
            newForm.doi = raw.doi || "";
            newForm.zenodoLink = raw.downloadUrl || raw.zenodoLink || "";
            newForm.tags = (raw.tags || []).join(", ");
            newForm.content = raw.content || "";
            newForm.images = (raw.images || []).join("\n");
            newForm.references = (raw.references || []).join("\n");
            // Extras do abstract
            newForm.authors = extras["Autores"] || (raw.authors || []).map({
                "EditarPublicacaoPage.useEffect": (a)=>a.name
            }["EditarPublicacaoPage.useEffect"]).join(", ");
            newForm.advisor = extras["Orientador"] || "";
            newForm.reportType = extras["Tipo"] || "";
            newForm.version = extras["Versão"] || "";
            newForm.reportNumber = extras["Nº"] || "";
            newForm.institution = extras["Instituição"] || "";
            newForm.presentationType = extras["Tipo"] || "";
            newForm.location = extras["Local"] || "";
            newForm.workload = extras["Carga horária"]?.replace("h", "") || "";
            newForm.certificate = extras["Certificado"] || "";
            newForm.eventDate = extras["Data"] || "";
            newForm.course = extras["Curso"] || "";
            newForm.researchArea = extras["Área"] || "";
            newForm.coAdvisor = extras["Coorientador"] || "";
            newForm.pages = extras["Páginas"] || "";
            newForm.committee = extras["Banca"] || "";
            newForm.grade = extras["Nota"] || "";
            newForm.github = extras["GitHub"] || "";
            setForm(newForm);
            setLoaded(true);
        }
    }["EditarPublicacaoPage.useEffect"], [
        publication,
        loaded
    ]);
    // Check permission — autor da publicação, criador, ou líder do projeto
    const canEdit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "EditarPublicacaoPage.useMemo[canEdit]": ()=>{
            if (!publication || !user) return false;
            const raw = publication;
            return raw.authors?.some({
                "EditarPublicacaoPage.useMemo[canEdit]": (a)=>a.id === user.id
            }["EditarPublicacaoPage.useMemo[canEdit]"]) || raw.userId === user.id || raw.createdBy === user.id || raw.authorId === user.id || raw.project?.ownerId === user.id || raw.project?.professorId === user.id || raw.project?.professor?.id === user.id;
        }
    }["EditarPublicacaoPage.useMemo[canEdit]"], [
        publication,
        user
    ]);
    // Build abstract with extras (same logic as create page)
    const buildAbstractWithExtras = ()=>{
        let abs = form.abstract;
        const extras = [];
        if (pubType === "REPORT") {
            if (form.advisor) extras.push(`Orientador: ${form.advisor}`);
            if (form.reportType) extras.push(`Tipo: ${form.reportType}`);
            if (form.version) extras.push(`Versão: ${form.version}`);
            if (form.reportNumber) extras.push(`Nº: ${form.reportNumber}`);
            if (form.institution) extras.push(`Instituição: ${form.institution}`);
        }
        if (pubType === "PRESENTATION") {
            if (form.journal) extras.push(`Evento: ${form.journal}`);
            if (form.presentationType) extras.push(`Tipo: ${form.presentationType}`);
            if (form.location) extras.push(`Local: ${form.location}`);
            if (form.workload) extras.push(`Carga horária: ${form.workload}h`);
            if (form.certificate) extras.push(`Certificado: ${form.certificate}`);
            if (form.eventDate) extras.push(`Data: ${form.eventDate}`);
        }
        if (pubType === "THESIS") {
            if (form.advisor) extras.push(`Orientador: ${form.advisor}`);
            if (form.coAdvisor) extras.push(`Coorientador: ${form.coAdvisor}`);
            if (form.course) extras.push(`Curso: ${form.course}`);
            if (form.institution) extras.push(`Instituição: ${form.institution}`);
            if (form.researchArea) extras.push(`Área: ${form.researchArea}`);
            if (form.pages) extras.push(`Páginas: ${form.pages}`);
            if (form.committee) extras.push(`Banca: ${form.committee}`);
            if (form.grade) extras.push(`Nota: ${form.grade}`);
            if (form.github) extras.push(`GitHub: ${form.github}`);
        }
        if (form.authors) extras.push(`Autores: ${form.authors}`);
        return extras.length > 0 ? `${abs}\n\n---\n${extras.join(" | ")}` : abs;
    };
    const handleUpdate = async ()=>{
        try {
            setFormError("");
            if (!form.title.trim()) {
                setFormError("Título obrigatório");
                return;
            }
            if (!form.abstract.trim()) {
                setFormError("Resumo obrigatório");
                return;
            }
            const yearNum = parseInt(form.year);
            if (isNaN(yearNum) || yearNum < 1900 || yearNum > 2100) {
                setFormError("Ano inválido");
                return;
            }
            const finalYear = pubType === "PRESENTATION" && form.eventDate ? parseInt(form.eventDate.slice(0, 4)) || yearNum : yearNum;
            await updateMutation.mutateAsync({
                id,
                data: {
                    title: form.title,
                    abstract: buildAbstractWithExtras(),
                    content: form.content || undefined,
                    images: form.images ? form.images.split("\n").map((u)=>u.trim()).filter(Boolean) : [],
                    references: form.references ? form.references.split("\n").map((r)=>r.trim()).filter(Boolean) : [],
                    type: pubType,
                    year: finalYear,
                    journal: form.journal || undefined,
                    doi: form.doi || undefined,
                    zenodoLink: form.zenodoLink || undefined,
                    tags: form.tags ? form.tags.split(",").map((t)=>t.trim()).filter(Boolean) : [],
                    projectId: form.projectId || undefined,
                    authorIds: selectedAuthors.map((a)=>a.id)
                }
            });
            router.push(`/publicacoes/${id}`);
        } catch (err) {
            setFormError(err?.response?.data?.message ?? "Erro ao atualizar publicação.");
        }
    };
    /* ── Loading ── */ if (pubLoading || authLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-pulse space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-8 w-48 bg-neutral-200 dark:bg-neutral-700 rounded"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                        lineNumber: 348,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-64 bg-neutral-200 dark:bg-neutral-700 rounded-2xl"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                        lineNumber: 349,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 347,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
            lineNumber: 346,
            columnNumber: 7
        }, this);
    }
    /* ── Sem permissão ── */ if (!canEdit) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-16 h-16 mx-auto mb-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                        size: 28
                    }, void 0, false, {
                        fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                        lineNumber: 360,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 359,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "font-display font-bold text-xl text-neutral-800 dark:text-neutral-200 mb-2",
                    children: "Sem permissão"
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 362,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-neutral-500 dark:text-neutral-400 mb-6",
                    children: "Você não tem permissão para editar esta publicação."
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 363,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: `/publicacoes/${id}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$components$2f$ui$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "secondary",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                size: 15
                            }, void 0, false, {
                                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                lineNumber: 365,
                                columnNumber: 39
                            }, this),
                            " Voltar"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                        lineNumber: 365,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                    lineNumber: 364,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
            lineNumber: 358,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: `/publicacoes/${id}`,
                className: "inline-flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors mb-6 group",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                        size: 15,
                        className: "group-hover:-translate-x-0.5 transition-transform"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                        lineNumber: 376,
                        columnNumber: 9
                    }, this),
                    " Voltar para publicação"
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 375,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white dark:bg-neutral-800 border border-emerald-200 dark:border-emerald-900 rounded-2xl p-6 shadow-card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                    size: 18,
                                    className: "text-emerald-600"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                    lineNumber: 382,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "font-display font-bold text-xl text-neutral-800 dark:text-neutral-200",
                                    children: "Editar publicação"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                    lineNumber: 383,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                            lineNumber: 381,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                        lineNumber: 380,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2",
                                children: "Tipo de publicação"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                lineNumber: 389,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 md:grid-cols-4 gap-2",
                                children: Object.entries(TYPE_LABELS_FORM).map(([val, lbl])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setPubType(val),
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all text-left", pubType === val ? "bg-emerald-600 text-white border-emerald-600 shadow-sm" : "bg-white dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-600 hover:border-emerald-300 hover:text-emerald-700 dark:hover:text-emerald-400"),
                                        children: lbl
                                    }, val, false, {
                                        fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                        lineNumber: 392,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                lineNumber: 390,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                        lineNumber: 388,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-t border-neutral-100 dark:border-neutral-700 pt-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 border border-emerald-100 dark:border-emerald-900 rounded-lg px-3 py-2 mb-5",
                                children: [
                                    "Editando: ",
                                    TYPE_LABELS_FORM[pubType]
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                lineNumber: 409,
                                columnNumber: 11
                            }, this),
                            formError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 p-3 mb-4 rounded-xl bg-danger-50 border border-red-200 text-danger-700 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                        lineNumber: 415,
                                        columnNumber: 15
                                    }, this),
                                    " ",
                                    formError
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                lineNumber: 414,
                                columnNumber: 13
                            }, this),
                            pubType === "ARTICLE" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FormArticle, {
                                form: form,
                                set: setForm,
                                projects: myProjects
                            }, void 0, false, {
                                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                lineNumber: 419,
                                columnNumber: 42
                            }, this),
                            pubType === "REPORT" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FormReport, {
                                form: form,
                                set: setForm,
                                projects: myProjects
                            }, void 0, false, {
                                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                lineNumber: 420,
                                columnNumber: 42
                            }, this),
                            pubType === "PRESENTATION" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FormPresentation, {
                                form: form,
                                set: setForm,
                                projects: myProjects
                            }, void 0, false, {
                                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                lineNumber: 421,
                                columnNumber: 42
                            }, this),
                            pubType === "THESIS" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FormThesis, {
                                form: form,
                                set: setForm,
                                projects: myProjects
                            }, void 0, false, {
                                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                lineNumber: 422,
                                columnNumber: 42
                            }, this),
                            form.projectId && selectedProject?.members?.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"], {
                                                size: 14,
                                                className: "text-emerald-600"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                                lineNumber: 428,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium text-neutral-700 dark:text-neutral-300",
                                                children: "Selecionar autores do projeto"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                                lineNumber: 429,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                        lineNumber: 427,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-neutral-400 mb-3",
                                        children: "Clique nos membros para adicioná-los como autores."
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                        lineNumber: 431,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-2",
                                        children: (selectedProject.members ?? []).map((m)=>{
                                            const isSelected = selectedAuthors.some((a)=>a.id === m.id);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>{
                                                    setSelectedAuthors((prev)=>isSelected ? prev.filter((a)=>a.id !== m.id) : [
                                                            ...prev,
                                                            {
                                                                id: m.id,
                                                                name: m.name
                                                            }
                                                        ]);
                                                },
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all", isSelected ? "bg-emerald-600 text-white border-emerald-600 shadow-sm" : "bg-white dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-600 hover:border-emerald-300 hover:text-emerald-600"),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold",
                                                        children: m.name?.[0]?.toUpperCase() ?? "?"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                                        lineNumber: 451,
                                                        columnNumber: 23
                                                    }, this),
                                                    m.name
                                                ]
                                            }, m.id, true, {
                                                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                                lineNumber: 436,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                        lineNumber: 432,
                                        columnNumber: 15
                                    }, this),
                                    selectedAuthors.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-emerald-600 mt-2",
                                        children: [
                                            selectedAuthors.length,
                                            " membro",
                                            selectedAuthors.length !== 1 ? "s" : "",
                                            " selecionado",
                                            selectedAuthors.length !== 1 ? "s" : ""
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                        lineNumber: 460,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                lineNumber: 426,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-700 grid gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                                        label: "Texto completo / Explicação detalhada",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                rows: 6,
                                                className: ta,
                                                value: form.content,
                                                onChange: (e)=>setForm({
                                                        ...form,
                                                        content: e.target.value
                                                    }),
                                                placeholder: "Texto extenso, metodologia, resultados, conclusões... Use ![descrição](url) para imagens inline."
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                                lineNumber: 470,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-neutral-400 mt-1",
                                                children: [
                                                    "Use ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                        className: "bg-neutral-100 dark:bg-neutral-700 px-1 rounded text-[11px]",
                                                        children: "![descrição](url)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                                        lineNumber: 478,
                                                        columnNumber: 21
                                                    }, this),
                                                    " para imagens inline."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                                lineNumber: 477,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                        lineNumber: 469,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                                        label: "URLs de imagens (uma por linha, opcional)",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            rows: 3,
                                            className: ta,
                                            value: form.images,
                                            onChange: (e)=>setForm({
                                                    ...form,
                                                    images: e.target.value
                                                }),
                                            placeholder: "https://exemplo.com/imagem1.png\nhttps://exemplo.com/imagem2.jpg"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                            lineNumber: 482,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                        lineNumber: 481,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldGroup, {
                                        label: "Referências bibliográficas (uma por linha, opcional)",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            rows: 5,
                                            className: ta,
                                            value: form.references,
                                            onChange: (e)=>setForm({
                                                    ...form,
                                                    references: e.target.value
                                                }),
                                            placeholder: "SOBRENOME, N. Título do trabalho. Ano. Available from: https://...\nSOBRENOME, N., SOBRENOME, N. Título do artigo. Revista, v. X, n. Y, p. Z. Ano."
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                            lineNumber: 491,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                        lineNumber: 490,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                lineNumber: 468,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-end gap-3 mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/publicacoes/${id}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$components$2f$ui$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "secondary",
                                            children: "Cancelar"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                            lineNumber: 503,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                        lineNumber: 502,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$components$2f$ui$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: handleUpdate,
                                        loading: updateMutation.isPending,
                                        className: "bg-emerald-600 hover:bg-emerald-700",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                                lineNumber: 506,
                                                columnNumber: 15
                                            }, this),
                                            " Salvar alterações"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                        lineNumber: 505,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                                lineNumber: 501,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                        lineNumber: 408,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
                lineNumber: 379,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/labex-front/app/publicacoes/[id]/editar/page.tsx",
        lineNumber: 372,
        columnNumber: 5
    }, this);
}
_s(EditarPublicacaoPage, "gkCbyEa7gTOCgnTkXAlAkY5n3p0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$contexts$2f$auth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$hooks$2f$useQueries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublication"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$hooks$2f$useQueries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboardProjects"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$hooks$2f$useQueries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdatePublication"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$hooks$2f$useQueries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProject"]
    ];
});
_c5 = EditarPublicacaoPage;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "FieldGroup");
__turbopack_context__.k.register(_c1, "FormArticle");
__turbopack_context__.k.register(_c2, "FormReport");
__turbopack_context__.k.register(_c3, "FormPresentation");
__turbopack_context__.k.register(_c4, "FormThesis");
__turbopack_context__.k.register(_c5, "EditarPublicacaoPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Downloads_labex-front_2b830e34._.js.map