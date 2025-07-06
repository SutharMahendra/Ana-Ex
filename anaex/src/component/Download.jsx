import html2canvas from 'html2canvas'; // convert chart to image
import jsPDF from 'jspdf'; // convert chart to PDF


function fixUnsupportedColors(element) {
    const elements = element.querySelectorAll("*");

    elements.forEach(el => {
        const computedStyle = window.getComputedStyle(el);

        if (computedStyle.color.includes("oklch")) {
            el.style.color = "#000000"; // fallback to black
        }
        if (computedStyle.backgroundColor.includes("oklch")) {
            el.style.backgroundColor = "#ffffff"; // fallback to white
        }
    });
}

function Download({
    reference,
    chartTitle = 'Chart',
    onReset // new prop for resetting chart state
}) {

    const downloadAsImage = async () => {
        if (!reference?.current) return;
        fixUnsupportedColors(reference.current);
        const canvas = await html2canvas(reference.current, {
            backgroundColor: '#ffffff' // override to prevent transparent/oklch issues
        });

        const link = document.createElement('a');
        link.download = `${chartTitle}.png`;
        link.href = canvas.toDataURL();
        link.click();
    };

    const downloadAsPDF = async () => {
        if (!reference?.current) return;
        fixUnsupportedColors(reference.current);
        const canvas = await html2canvas(reference.current, {
            backgroundColor: '#ffffff'
        });

        const imageData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('landscape', 'pt', 'a4');
        const width = pdf.internal.pageSize.getWidth();
        const height = (canvas.height * width) / canvas.width;

        pdf.setFontSize(18);
        pdf.text(chartTitle, 40, 30); // add title
        pdf.addImage(imageData, 'PNG', 0, 40, width, height);
        pdf.save(`${chartTitle}.pdf`);
    };

    const handleResetClick = () => {
        if (typeof onReset === 'function') {
            onReset();
        }
    };

    return (
        <div className="flex flex-wrap justify-center gap-4 mt-4">
            <button
                onClick={downloadAsImage}
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                Download as Image
            </button>

            <button
                onClick={downloadAsPDF}
                className="px-4 py-2 bg-green-600 text-white rounded"
            >
                Download as PDF
            </button>

            <button
                onClick={handleResetClick}
                className="px-4 py-2 bg-red-600 text-white rounded"
            >
                Reset
            </button>
        </div>
    );
}

export default Download; 