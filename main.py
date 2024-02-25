import csv
from dataclasses import dataclass
from typing import List
import ast

@dataclass
class CompanyData:
    company: str
    brands: List[str]
    total_emissions: int
    gross_revenue: int # in billions
    epd: int # emissions per dollar

# return a company_data object for company
def fetch_company_data(company_name):
    filename = 'company_emissions.csv'
    with open(filename, mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            if row['company_name'].lower() == company_name.lower():
                
                try:
                    brands_list = ast.literal_eval(row['brands'])
                    # Ensure brands_list is a list
                    if not isinstance(brands_list, list):
                        brands_list = [brands_list]
               
                except (ValueError, SyntaxError):
                    # Fallback for a single brand as a plain string (not in a list)
                    brands_list = [row['brands']] if row['brands'] else []
                
                # Calculate EPD
                epd = calculate_epd(int(row['total_emissions']), float(row['gross_revenue']))
                return CompanyData(company=row['company_name'], brands=brands_list, total_emissions=int(row['total_emissions']), gross_revenue=float(row['gross_revenue']), epd=epd)
    return None

# takes total emissions in MT CO2e and revenue in billions/year
def calculate_epd(total_emissions, gross_revenue):
    epd = total_emissions / gross_revenue / 1000000
    return epd



def main():
    prod_1 = 10
    prod_2 = 20
    prod_3 = 40

    amazon = fetch_company_data("amazon")
    nike = fetch_company_data("nike")
    whirlpool = fetch_company_data("whirlpool corporation")

    prod_1_emissions = prod_1 * amazon.epd
    prod_2_emissions = prod_2 * amazon.epd
    prod_3_emissions = prod_3 * nike.epd

    print(f"product 1 is ${prod_1} and contributes to {prod_1_emissions} kg of Amazon's emissions")
    print(f"product 2 is ${prod_2} and contributes to {prod_2_emissions} kg of Amazon's emissions")
    print(f"product 2 is ${prod_3} and contributes to {prod_3_emissions} kg of Nike's emissions")
    print()
    print(nike)
    print(amazon)
    print(whirlpool)


if __name__ == "__main__":
    main()