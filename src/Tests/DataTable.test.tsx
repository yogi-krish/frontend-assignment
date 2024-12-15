import { render, screen, fireEvent } from "@testing-library/react";
import DataTable from "../Table/DataTable";
import { Project, TableColumn } from "../types";

describe("Table Component", () => {
  const mockData:Project[] = [
    { "s.no": 1, "percentage.funded": 80, "amt.pledged": 1000 },
    { "s.no": 2, "percentage.funded": 50, "amt.pledged": 500 },
    { "s.no": 3, "percentage.funded": 30, "amt.pledged": 300 },
    { "s.no": 4, "percentage.funded": 70, "amt.pledged": 700 },
    { "s.no": 5, "percentage.funded": 60, "amt.pledged": 600 },
    { "s.no": 6, "percentage.funded": 90, "amt.pledged": 900 },
  ];
  const columns:TableColumn<Project>[] = [
    { key: "s.no", label: "S.No" },
    { key: "percentage.funded", label: "Percentage funded" },
    { key: "amt.pledged", label: "Amount pledged" },
  ];

  test("renders table with correct headers", () => {
    render(<DataTable data={mockData} columns={columns} />);
    
    columns.forEach((column) => {
      expect(screen.getByText(column.label)).toBeInTheDocument();
    });
  });

  test("renders correct data in table rows", () => {
    render(<DataTable data={mockData} columns={columns} pageSize={mockData.length}/>);

    mockData.forEach((row, idx) => {
      expect(screen.getByText(row["s.no"].toString())).toBeInTheDocument();
      expect(screen.getByText(row["percentage.funded"].toString())).toBeInTheDocument();
      expect(screen.getByText(row["amt.pledged"].toString())).toBeInTheDocument();
    });
  });

  test("correctly paginates data", () => {
    render(<DataTable data={mockData} columns={columns} pageSize={2} />);


    expect(screen.getByText("S.No")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Amount pledged")).toBeInTheDocument();

    
    fireEvent.click(screen.getByText("Next"));
    expect(screen.getByText("S.No")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("Amount pledged")).toBeInTheDocument();
  });

  test("disables next button on last page", () => {
    render(<DataTable data={mockData} columns={columns} pageSize={2} />);
    
    fireEvent.click(screen.getByText("Next"));
    fireEvent.click(screen.getByText("Next"));
    
    const nextButton = screen.getByLabelText("Go to Next Page");
    expect(nextButton).toBeDisabled();
  });

  test("disables previous button on first page", () => {
    render(<DataTable data={mockData} columns={columns} pageSize={2} />);
    
    const prevButton = screen.getByLabelText("Go to Previous Page");
    expect(prevButton).toBeDisabled();
  });
});
