import pickle

# take user input to take the amount of data
# number_of_data = int(input('Enter the number of data : '))
# data = []

# take input of the data
# for i in range(number_of_data):
#     raw = input('Enter data '+str(i)+' : ')
#     data.append(raw)

def fnc(c=0):
    a = 1
    b = 2
    return a,b,c

data2 = { 
  "string": "world",
  "obj": { "a": "b"},
  "arr": [1,2],
  "float": 323.54,
  "int": 12,
  # "complex": 3+4j,
  # "fnc": fnc
}

class Laptop:
	
	def __init__(self, name, processor, hdd, ram, cost):
		self.name = name
		self.processor = processor
		self.hdd = hdd
		self.ram = ram
		self.cost = cost
		
	def details(self):
		print('The details of the laptop are:')
		print('Name         :', self.name)
		print('Processor    :', self.processor)
		print('HDD Capacity :', self.hdd)
		print('RAM          :', self.ram)
		print('Cost($)      :', self.cost)
		
#create object
laptop1 = Laptop('Dell Alienware', 'Intel Core i7', 512, 8, 2500.00)

# open a file, where you ant to store the data
file = open('pickleFile5.pickle', 'wb')

# dump information to that file
pickle.dump(data2, file)
# pickle.dump(laptop1, file)
s = pickle.dumps(data2)
print(s)

# close the file
file.close()