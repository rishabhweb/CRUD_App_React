#include<bits/stdc++.h>
using namespace std;

int main() {
	int n;
	cin >> n;
	vector < int > slipA, slipB, diff;
	for(int i = 0;i < n;i++)
	{
		int a;
		cin >> a;
		slipB.push_back(a);
	}


	for(int i = 0;i < n - 1;i++)
	{
		diff.push_back(slipB[i + 1] - slipB[i]);
	}


	int sum = 0, sum_1 = 0;
	for(int i = 0;i < n - 1;i++)
	{
		sum_1 += diff[i];
		sum += sum_1;
	}

	slipA.push_back((sum + slipB[0])/(n - 1));

	sum_1 = 0;
	for(int i = 1; i < n;i++)
	{
		sum_1 += diff[i - 1];
		slipA.push_back(slipA[0] - sum_1);
	}

	for(int i = 0;i < n;i++) 
	{
		cout << slipA[i] << " ";
	}

	cout << "\n";



}