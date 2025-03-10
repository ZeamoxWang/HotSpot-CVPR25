import os
from pdf2image import convert_from_path

def convert_pdf_to_png(root_dir):
    # 遍历相邻目录及其子目录
    for subdir, _, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.pdf'):
                pdf_path = os.path.join(subdir, file)
                png_path = os.path.join(subdir, f"{os.path.splitext(file)[0]}.png")
                
                # 转换 PDF 第一页为 PNG（最高清晰度）
                images = convert_from_path(pdf_path, dpi=600)
                if images:
                    images[0].save(png_path, 'PNG')
                    print(f"✅ 转换完成: {png_path}")

if __name__ == "__main__":
    # 假设当前目录为基准
    current_directory = os.path.abspath(os.path.join(os.getcwd(), ".."))
    convert_pdf_to_png(current_directory)
