// Декларации типов для ассетов изображений
// Создайте этот файл в src/ и добавьте в tsconfig.json или импортируйте в index.tsx

declare module '*.png' {
    const value: string;
    export default value;
}

declare module '*.svg' {
    const value: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    export default value;
}

declare module '*.jpg' {
    const value: string;
    export default value;
}

declare module '*.jpeg' {
    const value: string;
    export default value;
}

declare module '*.gif' {
    const value: string;
    export default value;
}

declare module '*.webp' {
    const value: string;
    export default value;
}
