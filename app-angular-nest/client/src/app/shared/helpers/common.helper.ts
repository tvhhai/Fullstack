// Checks if a value is defined
export function isDefined(value: any): boolean {
    return typeof value!=="undefined";
}

// Formats a number as currency
export function formatCurrency(amount: number, locale: string = "en-US", currencyCode: string = "USD"): string {
    // Create a new Intl.NumberFormat object with the specified locale and currency code
    const formatter = new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currencyCode
    });
    // Format the amount as currency using the formatter
    return formatter.format(amount);
}


export function getLighterColor(color: string, transparency: number): string {
    // Kiểm tra nếu màu nhập vào là HEX
    if (color.startsWith("#")) {
        const hexValue = color.substring(1); // Lấy chuỗi HEX bỏ qua dấu "#"
        const intValue = parseInt(hexValue, 16); // Chuyển HEX sang INT

        // Tách thành ba thành phần màu RGB
        const red = (intValue >> 16) & 255;
        const green = (intValue >> 8) & 255;
        const blue = intValue & 255;

        // Tính toán màu mới cho màu nền dựa trên độ trong suốt
        const newRed = Math.round((1 - transparency) * red + transparency * 255);
        const newGreen = Math.round((1 - transparency) * green + transparency * 255);
        const newBlue = Math.round((1 - transparency) * blue + transparency * 255);

        // Chuyển đổi màu RGB mới thành HEX
        const newHexValue = (newRed << 16) + (newGreen << 8) + newBlue;

        return "#" + newHexValue.toString(16).padStart(6, "0");
    } else if (color.startsWith("rgb") || color.startsWith("rgba")) {
        // Kiểm tra nếu màu nhập vào là RGBA
        const rgbaValue = color.match(/\d+(\.\d+)?/g)!.map(Number);

        // Tính toán màu mới cho màu nền dựa trên độ trong suốt
        const newRgba = rgbaValue.map((value, index) =>
                index < 3 ? Math.round((1 - transparency) * value + transparency * 255):value
        );

        // Tạo chuỗi màu RGBA mới
        return rgbaValue.length===3 ? `rgba(${newRgba.join(",")})`:`rgba(${newRgba.join(",")},${rgbaValue[3]})`;
    } else {
        // Trường hợp màu không hợp lệ, trả về màu gốc
        return color;
    }
}