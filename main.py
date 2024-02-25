import csv
from dataclasses import dataclass
from typing import List
import ast

@dataclass
class CompanyData:
    company: str
    brands: List[str]
    total_emissions: int
    gross_revenue: float  # in billions
    epd: float = 0.0  # emissions per dollar, initialized to 0.0
    amazon_epd: float = 0.12399526775461917 # hard-coded from 2022 data

    @staticmethod
    def fetch_company_data(search_term: str):
        filename = 'company_emissions.csv'
        with open(filename, mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                # Attempt to safely parse the brands list
                try:
                    brands_list = ast.literal_eval(row['brands'])
                    if not isinstance(brands_list, list):
                        brands_list = [brands_list]
                except (ValueError, SyntaxError):
                    brands_list = [row['brands']] if row['brands'] else []

                # Check if the search term matches the company name or is one of the brands
                if row['company_name'].lower() == search_term.lower() or search_term.lower() in [brand.lower() for brand in brands_list]:
                    epd = CompanyData.calculate_epd(int(row['total_emissions']), float(row['gross_revenue']))
                    return CompanyData(company=row['company_name'], brands=brands_list, total_emissions=int(row['total_emissions']),
                                        gross_revenue=float(row['gross_revenue']), epd=epd)
        return None

    @staticmethod
    def calculate_epd(total_emissions, gross_revenue):
        return total_emissions / (gross_revenue * 1_000_000)  # Adjust for gross_revenue in billions to match unit

    def calculate_product_emissions(self, price, add_amazon = True):
        if add_amazon:
            return price * self.epd * 0.85 + price * self.amazon_epd * .15
        else:
            return price * self.epd

def main():
    prod_1 = 10
    prod_2 = 20
    prod_3 = 40
    prod_4 = 80

    amazon = CompanyData.fetch_company_data("amazon")
    nike = CompanyData.fetch_company_data("nike")
    kitchenaid = CompanyData.fetch_company_data("kitchenaid")

    if amazon and nike and kitchenaid:
        prod_1_emissions = amazon.calculate_product_emissions(prod_1)
        prod_2_emissions = amazon.calculate_product_emissions(prod_2)
        prod_3_emissions = nike.calculate_product_emissions(prod_3)
        prod_4_emissions = nike.calculate_product_emissions(prod_4)

        print(f"Product 1 is ${prod_1} and contributes to {prod_1_emissions} kg of Amazon's emissions")
        print(f"Product 2 is ${prod_2} and contributes to {prod_2_emissions} kg of Amazon's emissions")
        print(f"Product 3 is ${prod_3} and contributes to {prod_3_emissions} kg of Nike's emissions")
        print(f"Product 4 is ${prod_4} and contributes to {prod_4_emissions} kg of KitchenAid's emissions")

    else:
        print("Error fetching company data.")

    # Demonstrating that the objects contain the expected data
    for company in (nike, amazon, kitchenaid):
        if company:
            print(company)
        else:
            print("Company data not found.")

if __name__ == "__main__":
    main()
